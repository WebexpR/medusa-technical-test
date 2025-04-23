<p align="center">
  <h1>Medusa Technical Test</h1>
</p>

## Overview

This is a technical test for Medusa, an open-source composable commerce platform. The test **focuses on building a wishlist feature** using Medusa's architecture patterns.


## Installation

First of all, you need to install docker and docker-compose.

Then, you need to run the project with docker-compose.

```bash
docker-compose up -d # Docker v27<=
```

Or 
```bash
docker compose up -d # Docker v28>=
```

Then, you need to install the dependencies.
```bash
yarn install
```

## Requirements

As a candidate, you should implement a complete wishlist feature by following these requirements.
A wishlist is a list of products that a customer wants to save for later.

> **Note**
> 🚨 All the files must be written in TypeScript.

### 1. Models

Each models should extend from the `BaseEntity` class imported from `@medusajs/medusa`, to make sure we have `id`, `created_at`, `updated_at` default fields.

> Please refer to the `src/models/MODELS_README.md` file for more information on the implementation of the models.

#### Wishlist Model
- Create a model called `Wishlist` with the file name `wishlist.ts`
- Each wishlist should have:
  - A title of type `text`
  - A `customer_id` field of type `text`
  - A list of `WishlistItem` (one-to-many relationship), named `items`
- We should use the `BeforeInsert` decorator to generate the `id` field using the `generateEntityId` function imported from `@medusajs/utils`
- The prefix is up to you

#### WishlistItem Model
- Create a model called `WishlistItem` with the file name `wishlist-item.ts`
- Each wishlist item should have:
  - A relation to a `Wishlist` (many-to-one relationship)
  - A `product_id` field that relates to the Medusa `Product` model
  - You can import the `Product` model from `@medusajs/medusa` package
- We should use the `BeforeInsert` decorator to generate the `id` field using the `generateEntityId` function imported from `@medusajs/utils`
- The prefix is up to you


⚠️ Don't forget to add the migrations for the new models inside the `src/migrations/1744797048433-add-wishlist-schema.ts` file.
Migrations must be written manually without using the TypeORM CLI generation tools.

### 2. Repositories

> Please refer to the `src/repositories/REPOS_README.md` file for more information.

- Create a repository for both models:
  - `WishlistRepository`
  - `WishlistItemRepository`
- These repositories should function as a Data Access Layer (DAL) for the models


## Test Your Implementation
The Models and Repositories part can be tested by running the `yarn test` command, for the next parts, you'll be on your own.

--- 

### 3. Services

> Please refer to the `src/services/SERVICES_README.md` file for more information.

Implement a service that provides the following functionality:
- `listAndCount`: Get a list of wishlists
- `retrieve`: Get a single wishlist by ID
- `create`: Create a new wishlist with items

### 4. API Routes

> Please refer to the `src/api/API_README.md` file for more information.

Create API routes that allow users to:
- List all wishlists
- Retrieve a single wishlist
- Create a new wishlist with items

### Testing

- Ensure all unit tests in the project are passing after your implementation
- Do not modify the existing tests, make your implementation compatible with them

## Evaluation Criteria

Your submission will be evaluated based on:
- Code quality and organization
- Proper implementation of Medusa's architectural patterns
- Feature completeness according to requirements
- All tests passing
- Proper implementation of error handling

## Submission

When you've completed the implementation, please follow the submission instructions provided separately.

Good luck!

