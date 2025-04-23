import { Product as MedusaProduct } from "@medusajs/medusa";
import { Entity, OneToMany, Relation } from "typeorm";
import { WishlistItem } from "./wishlist-item";


/**
 * ! DO NOT MODIFY THIS FILE
 */
@Entity()
export class Product extends MedusaProduct {
    @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.product)
    wishlistItems?: Relation<WishlistItem>[];
}