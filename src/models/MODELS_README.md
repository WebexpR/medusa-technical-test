# Custom models

You may define custom models (entities) that will be registered on the global container by creating files in the `src/models` directory that export an instance of `BaseEntity`.

## Example

### 1. Create the Entity

```ts
// src/models/post.ts

import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity } from "@medusajs/medusa";
import { User } from "./user";

@Entity()
export class Post extends BaseEntity {
  @Column({type: 'varchar'})
  title: string | null;

  @Column({type: 'text'})
  user_id: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({name: 'user_id'})
  user: User;


  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "post")
  }
}
```

### 2. Create the Migration

You also need to create a Migration to create the new table in the database