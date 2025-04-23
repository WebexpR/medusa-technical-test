import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * This migration should create the Wishlist and WishlistItem entities
 * and add the necessary columns to the database
 * 
 * You can use the queryRunner how you want to add the columns, relations, etc...
 * 
 * @references
 * https://typeorm.io/migrations#using-migration-api-to-write-migrations
 */
export class AddWishlistSchema1744797048433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
