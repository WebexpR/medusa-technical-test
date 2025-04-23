import { getOrSetupTestDatabase } from '../../utils/setup-test-database'
import { describe, it, beforeAll, expect } from 'vitest'

describe('Wishlist Models Integration Test', () => {
    let connection

    beforeAll(async () => {
        connection = await getOrSetupTestDatabase()
        console.log("Database connection established:", !!connection)
    })

    it('should have Wishlist model with correct fields', async () => {
        try {
            // Verify the Wishlist entity exists
            const wishlistMetadata = connection.getMetadata('wishlist')

            // Check that the Wishlist entity exists
            expect(wishlistMetadata).toBeDefined()

            // Check that it extends BaseEntity by verifying default fields
            const columns = wishlistMetadata.columns

            // Check base fields
            expect(columns.find(col => col.propertyName === 'id')).toBeDefined()
            expect(columns.find(col => col.propertyName === 'created_at')).toBeDefined()
            expect(columns.find(col => col.propertyName === 'updated_at')).toBeDefined()

            // Check required fields from the spec
            expect(columns.find(col => col.propertyName === 'title')).toBeDefined()
            expect(columns.find(col => col.propertyName === 'customer_id')).toBeDefined()

            // Check relation to WishlistItem
            const relations = wishlistMetadata.relations

            // check items relation
            const itemsRelation = relations.find(rel => rel.propertyName === 'items')
            if (!itemsRelation) {
                throw new Error('Wishlist model does not have items relation')
            }
            expect(itemsRelation).toBeDefined()
            expect(itemsRelation.relationType).toBe('one-to-many')

            // check customer relation
            const customerRelation = relations.find(rel => rel.propertyName === 'customer')
            if (!customerRelation) {
                throw new Error('Wishlist model does not have customer relation')
            }
            expect(customerRelation).toBeDefined()
            expect(customerRelation.relationType).toBe('many-to-one')
        } catch (error) {
            /**
             * !TODO: Add the Wishlist model with required fields:
             * - title (text)
             * - items (one-to-many relation to WishlistItem)
             */
            throw new Error('Wishlist model not properly implemented: ' + error.message)
        }
    })

    it('should have WishlistItem model with correct fields', async () => {
        try {
            // Verify the WishlistItem entity exists
            const wishlistItemMetadata = connection.getMetadata('wishlist_item')

            // Check that the WishlistItem entity exists
            expect(wishlistItemMetadata).toBeDefined()

            // Check that it extends BaseEntity
            const columns = wishlistItemMetadata.columns

            // Check base fields
            expect(columns.find(col => col.propertyName === 'id')).toBeDefined()
            expect(columns.find(col => col.propertyName === 'created_at')).toBeDefined()
            expect(columns.find(col => col.propertyName === 'updated_at')).toBeDefined()

            // Check product_id field
            const productIdColumn = columns.find(col => col.propertyName === 'product_id')
            if (!productIdColumn) {
                throw new Error('WishlistItem model does not have product_id relation')
            }
            expect(productIdColumn).toBeDefined()

            const wishlistIdColumn = columns.find(col => col.propertyName === 'wishlist_id')
            if (!wishlistIdColumn) {
                throw new Error('WishlistItem model does not have wishlist_id field')
            }
            expect(wishlistIdColumn).toBeDefined()

            // Check relation to Wishlist
            const relations = wishlistItemMetadata.relations
            const wishlistRelation = relations.find(rel => rel.propertyName === 'wishlist')
            const productRelation = relations.find(rel => rel.propertyName === 'product')

            expect(wishlistRelation).toBeDefined()
            if (!wishlistRelation) {
                throw new Error('WishlistItem model does not have wishlist relation')
            }

            expect(wishlistRelation.relationType).toBe('many-to-one')

            expect(productRelation).toBeDefined()
            if (!productRelation) {
                throw new Error('WishlistItem model does not have product relation')
            }

            expect(productRelation.relationType).toBe('many-to-one')
        } catch (error) {
            /**
             * !TODO: Add the WishlistItem model with required fields:
             * - product_id (text)
             * - product (many-to-one relation to Product)
             * - wishlist (many-to-one relation to Wishlist)
             */
            throw new Error('WishlistItem model not properly implemented: ' + error.message)
        }
    })
}) 