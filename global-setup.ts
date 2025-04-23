import { beforeAll, afterAll } from 'vitest'
import { testDatabase } from './src/utils/setup-test-database'

beforeAll(async () => {
    await testDatabase.setup()
})

afterAll(async () => {
    await testDatabase.destroy()
})