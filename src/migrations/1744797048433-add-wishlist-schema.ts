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
        // Example with Wishlist Table
        await queryRunner.query(`
            CREATE TABLE "wishlist" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "customer_id" character varying NOT NULL,
                PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
