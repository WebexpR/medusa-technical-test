# Medusa Technical Test

## Overview

This technical test focuses on building a wishlist feature using Medusa's architecture patterns. A wishlist allows customers to save products they're interested in for later.

## Prerequisites

- Docker and Docker Compose installed
- Node.js and Yarn package manager
- Basic understanding of TypeScript and TypeORM

## Setup Instructions

1. Start the development environment:
   ```bash
   # For Docker v27 and below
   docker-compose up -d

   # For Docker v28 and above
   docker compose up -d
   ```

2. Install project dependencies:
   ```bash
   yarn install
   ```

## Project Structure

The project follows Medusa's architecture patterns with the following key components:

- `src/models/`: Database models
- `src/repositories/`: Data access layer
- `src/services/`: Business logic
- `src/api/`: API endpoints
- `src/migrations/`: Database migrations

## Implementation Requirements

### 1. Database Models

#### Pre-existing Models
- `customer.ts`: Already has a one-to-many relationship with Wishlist
- `product.ts`: Already has a one-to-many relationship with WishlistItem
- ⚠️ These files should not be modified

#### New Models to Implement

##### Wishlist Model (`wishlist.ts`)
- Extend `BaseEntity` from `@medusajs/medusa`
- Required fields:
  - `title`: text
  - `customer_id`: text
  - `customer` : A Many-to-one relationship with `Customer` model
  - `items`: One-to-many relationship with `WishlistItem` model
- Use `@BeforeInsert` decorator with `generateEntityId` for ID generation

##### WishlistItem Model (`wishlist-item.ts`)
- Extend `BaseEntity` from `@medusajs/medusa`
- Required fields:
  - `wishlist_id`: text
  - `wishlist` : A Many-to-one relationship with `Wishlist` model
  - `product_id`: text
  - `product` : A Many-to-one relationship with `Product` model
- Use `@BeforeInsert` decorator with `generateEntityId` for ID generation

### 2. Database Migration

Create a migration file at `src/migrations/1744797048433-add-wishlist-schema.ts` to:
- Create the wishlist table
- Create the wishlist_item table
- Set up foreign key relationships

### 3. Repositories

Implement two repositories using the `src/repositories/REPOS_README.md` file.
- `WishlistRepository`: Data access layer for Wishlist model
- `WishlistItemRepository`: Data access layer for WishlistItem model

### 4. Service Layer

Implement a service called `WishlistService` with the following methods:
- `listAndCount`: Retrieve paginated wishlists
- `retrieve`: Get a single wishlist by ID
- `create`: Create a new wishlist with items

### 5. API Endpoints

Create REST endpoints for:
- `GET /wishlists`: List all wishlists
- `GET /wishlists/:id`: Get a single wishlist
- `POST /wishlists`: Create a new wishlist with items

## Testing

1. Run the test suite:
   ```bash
   yarn test
   ```

2. Ensure all tests pass without modifying existing test files

## Evaluation Criteria

Your implementation will be evaluated based on:
- Code quality and organization
- Proper implementation of Medusa's architectural patterns
- Feature completeness
- Test coverage
- Error handling
- Documentation (JSDoc comments for functions and classes)

## Development Guidelines

- All files must be written in TypeScript
- Use kebab-case for file names (e.g., `wishlist.ts`, `wishlist-item.ts`)
- Follow Medusa's architectural patterns
- Write clear JSDoc comments for functions and classes
- Implement proper error handling
- Ensure all tests pass