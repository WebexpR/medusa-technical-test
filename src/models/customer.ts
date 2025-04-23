import { Customer as MedusaCustomer } from "@medusajs/medusa";
import { Entity, OneToMany, Relation } from "typeorm";
import { Wishlist } from "./wishlist";


/**
 * ! DO NOT MODIFY THIS FILE
 */
@Entity()
export class Customer extends MedusaCustomer {
    @OneToMany(() => Wishlist, (wishlist) => wishlist.customer)
    wishlists: Relation<Wishlist>[];
}