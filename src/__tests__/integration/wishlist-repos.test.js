import { beforeAll, describe, it, expect } from 'vitest'
import { getOrSetupTestDatabase } from '../../utils/setup-test-database'
import { Customer } from '../../models/customer'
import { Product } from '../../models/product'


describe('Wishlist Repositories', () => {
    let connection
    let wishlistRepository
    let wishlistItemRepository
    let productRepository
    let customerRepository

    beforeAll(async () => {
        // Setup the database connection first
        connection = await getOrSetupTestDatabase()

        // Import the repositories after the connection is established
        const { WishlistRepository } = await import('../../repositories/wishlist')
        const { WishlistItemRepository } = await import('../../repositories/wishlist-item')

        productRepository = connection.getRepository(Product)
        customerRepository = connection.getRepository(Customer)
        wishlistRepository = WishlistRepository
        wishlistItemRepository = WishlistItemRepository
    })

    describe('Wishlist Repository', () => {
        it('should be a valid repository', async () => {
            expect(wishlistRepository).toBeDefined()
            expect(wishlistRepository.manager).toBeDefined()
        })

        it('should create a new wishlist', async () => {
            // * Create a customer
            const customer = customerRepository.create({
                email: 'test@test.com',
                first_name: 'Test',
                last_name: 'User'
            })

            const savedCustomer = await customerRepository.save(customer)

            // * Create a new wishlist
            const wishlist = wishlistRepository.create({
                title: 'Test Wishlist',
                customer_id: savedCustomer.id
            })

            const savedWishlist = await wishlistRepository.save(wishlist)

            // * Verify wishlist was created
            expect(savedWishlist.id).toBeDefined()
            expect(savedWishlist.title).toBe('Test Wishlist')

            // * Clean up
            await wishlistRepository.remove(savedWishlist)
        })
    })

    describe('Wishlist Item Repository', () => {
        it('should be a valid repository', async () => {
            expect(wishlistItemRepository).toBeDefined()
            expect(wishlistItemRepository.manager).toBeDefined()
        })

        it('should create a wishlist item linked to a wishlist', async () => {
            // * Create a customer
            const customer = customerRepository.create({
                email: `${Math.random().toString(36).substring(2, 15)}@test.com`,
                first_name: 'Test',
                last_name: 'User',
            })
            const savedCustomer = await customerRepository.save(customer)

            // * Create a wishlist for the customer
            const wishlist = await wishlistRepository.save(
                wishlistRepository.create({
                    title: 'Test Wishlist for Item',
                    customer_id: savedCustomer.id
                })
            )

            const product = await productRepository.save(
                productRepository.create({ title: 'Test Product' })
            )

            // * Now create a wishlist item linked to the wishlist
            const wishlistItem = wishlistItemRepository.create({
                product_id: product.id,
                wishlist_id: wishlist.id
            })

            const savedItem = await wishlistItemRepository.save(wishlistItem)

            // * Verify item was created with correct associations
            expect(savedItem.id).toBeDefined()
            expect(savedItem.product_id).toBe(product.id)
            expect(savedItem.wishlist_id).toBe(wishlist.id)

            // * Clean up - delete item first due to foreign key constraints
            await wishlistItemRepository.remove(savedItem)
            await wishlistRepository.remove(wishlist)
        })
    })
})