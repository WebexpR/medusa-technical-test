import loadConfig from '@medusajs/medusa/dist/loaders/config'
// eslint-disable-next-line import/order
import path from 'path'
import { createConnection } from 'typeorm'
import fs from 'fs'
import os from 'os'
// Global state for the singleton connection
export let dataSource = null
let connectionPromise = null
let isInitializing = false
const lockFilePath = path.join(os.tmpdir(), 'medusa-test-db-lock')

/**
 * Wait for a specified amount of time
 * @param {number} ms - milliseconds to wait
 * @returns {Promise<void>} Promise that resolves after the wait
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Acquire a lock file for database initialization
 * @returns {Promise<boolean>} Whether the lock was acquired
 */
const acquireLock = async () => {
    try {
        // Try to create the lock file - will fail if it already exists
        fs.writeFileSync(lockFilePath, String(process.pid), { flag: 'wx' })
        return true
    } catch (error) {
        // If file exists, someone else has the lock
        if (error.code === 'EEXIST') {
            return false
        }
        console.error('Error acquiring lock:', error)
        throw error
    }
}

/**
 * Release the lock file
 */
const releaseLock = () => {
    try {
        if (fs.existsSync(lockFilePath)) {
            const lockPid = fs.readFileSync(lockFilePath, 'utf8')
            // Only delete if our process created it
            if (String(process.pid) === lockPid) {
                fs.unlinkSync(lockFilePath)
            }
        }
    } catch (error) {
        console.error('Error releasing lock:', error)
    }
}

/**
 * Cleanup function that ensures database connections are properly closed
 * @returns {Promise<void>} Promise that resolves when cleanup is complete
 */
const cleanup = async () => {
    try {
        if (dataSource && dataSource.isConnected) {
            await dataSource.close()
            dataSource = null
            console.log('Database connection closed during cleanup')
        }
    } catch (error) {
        console.error('Error during database cleanup:', error)
    } finally {
        releaseLock()
    }
}

// Handle process termination signals to ensure proper cleanup
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, cleaning up database connections')
    await cleanup()
    process.exit(0)
})

process.on('SIGINT', async () => {
    console.log('SIGINT received, cleaning up database connections')
    await cleanup()
    process.exit(0)
})

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
    console.error('Uncaught exception:', error)
    console.log('Cleaning up database connections due to uncaught exception')
    await cleanup()
    process.exit(1)
})

// Ensure cleanup on process exit
process.on('exit', () => {
    releaseLock()
})

export const testDatabase = {
    setup: async () => {
        // If we already have a connected global connection, return it
        if (dataSource && dataSource.isConnected) {
            return dataSource
        }

        // If another process is initializing, wait for an existing initialization
        if (connectionPromise) {
            return connectionPromise
        }

        // Start a new initialization process
        isInitializing = true
        connectionPromise = (async () => {
            try {
                // Attempt to acquire the lock
                let hasLock = await acquireLock()

                // If we can't get the lock, wait until the lock file is gone
                while (!hasLock) {
                    // Wait a bit before trying again
                    await sleep(500)
                    hasLock = await acquireLock()
                }

                // Check if dataSource was created while we were waiting
                if (dataSource && dataSource.isConnected) {
                    return dataSource
                }

                const rootDirectory = process.cwd()
                const configModule = loadConfig(rootDirectory)

                const medusaEntitiesPath = path.join(
                    rootDirectory,
                    'node_modules',
                    '@medusajs',
                    'medusa',
                    'dist',
                    'models',
                    '*.js',
                )

                const medusaMigrationsPath = path.join(
                    rootDirectory,
                    'node_modules',
                    '@medusajs',
                    'medusa',
                    'dist',
                    'migrations',
                    '*.js',
                )

                const localMigrationsPath = path.join(
                    __dirname,
                    '..',
                    '..',
                    'dist',
                    'migrations',
                    '*.js',
                )

                console.log('Setting up test database with migrations')

                const databaseUrl = configModule.projectConfig.database_url

                // If there's an existing connection, close it first
                if (dataSource) {
                    await dataSource.close()
                }

                // Create a new connection with direct entity references
                dataSource = await createConnection({
                    type: 'postgres',
                    url: databaseUrl,
                    entities: [
                        medusaEntitiesPath,
                        (await import('../models/wishlist'))['Wishlist'],
                        (await import('../models/wishlist-item'))['WishlistItem'],
                        (await import('../models/customer'))['Customer'],
                        (await import('../models/product'))['Product'],
                    ],
                    migrations: [
                        medusaMigrationsPath,
                        localMigrationsPath,
                    ],
                    synchronize: false,
                    dropSchema: true,
                    migrationsRun: true,
                    logging: false,
                })

                return dataSource
            } finally {
                isInitializing = false
                connectionPromise = null
                releaseLock()
            }
        })()

        return connectionPromise
    },

    destroy: async () => {
        return cleanup()
    },

    getConnection: () => {
        return dataSource
    },
}

export async function getOrSetupTestDatabase() {
    if (dataSource && dataSource.isConnected) {
        return dataSource
    }

    return await testDatabase.setup()
}
