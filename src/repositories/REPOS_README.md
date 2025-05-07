# Custom repositories

Repositories provide generic helper methods for entities and are used to interact with your database. By default, you don't need to create a repository for your custom entities, as you can retrieve the default repository of an entity using the Entity Manager. You should only create a repository if you want to implement custom methods.

## Overview

Repositories are Typeorm repositories, so you can refer to [Typeorm's documentation](https://typeorm.io/repository-api) on all available methods.

## Example

### 1. Create the Repository

```ts
// src/repositories/post.ts

import { Post } from "../models/post"
import {
  dataSource
} from '../utils/setup-test-database'

export const PostRepository = dataSource
  .getRepository(Post)

export default PostRepository
```

### 2. Using Custom Repositories in Services

```ts
// src/services/post.ts

import { PostRepository } from "../repositories/post"

class PostService extends TransactionBaseService {
  protected postRepository_: typeof PostRepository

  constructor(container) {
    super(container)
    this.postRepository_ = container.postRepository
  }

  async list(): Promise<Post[]> {
    const postRepo = this.activeManager_.withRepository(
      this.postRepository_
    )
    return await postRepo.find()
  }
}
```

## Common Repository Methods

- **find**: Retrieve a list of records with filtering, pagination, and relations
- **findOne**: Retrieve a single record
- **findAndCount**: Retrieve a list of records along with their count
- **create/save**: Create a new record
- **save**: Update an existing record
- **remove**: Delete a record
- **softRemove**: Soft delete a record (if entity extends SoftDeletableEntity)

See more about [Repositories](https://docs.medusajs.com/v1/development/entities/repositories) in the documentation. 