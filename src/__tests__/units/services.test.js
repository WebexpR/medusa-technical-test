import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Wishlist Service', () => {
    let wishlistService

    beforeEach(async () => {
        const WishlistService = await import('../../services/wishlist').then((module) => module.default).catch((err) => {
            console.error(`Medusa's services should be exported by default.`)
            return null
        })
        wishlistService = new WishlistService({
            wishlistRepository: vi.fn()
        })
    })

    it('should be defined', () => {
        expect(wishlistService).not.toBeNull()
    })

    it('should have a listAndCount method', () => {
        expect(wishlistService.listAndCount).toBeDefined()
    })

    it('should have a create method', () => {
        expect(wishlistService.create).toBeDefined()
    })

})