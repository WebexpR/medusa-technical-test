# Custom services

You may define custom services that will be registered on the global container by creating files in the `/services` directory that export an instance of `BaseService`.

```ts
// src/services/my-custom.ts
import { TransactionBaseService } from "@medusajs/medusa"
import { type Repository } from "typeorm"
import { type Post } from "../models/post"

type InjectedDependencies = {
  postRepository: Repository<Post>
}

export default class PostService extends TransactionBaseService {
  protected postRepository_: Repository<Post>

  constructor(container: InjectedDependencies) {
    // @ts-ignore
    super(container)
    this.postRepository_ = container.postRepository
  }

  async listAndCount(): Promise<[Post[], number]> {
    const postRepo = this.activeManager_.withRepository(
      this.postRepository_
    )
    return await postRepo.findAndCount()
  }
}

```

The first argument to the `constructor` is the global giving you access to easy dependency injection. The container holds all registered services from the core, installed plugins and from other files in the `/services` directory. The registration name is a camelCased version of the file name with the type appended i.e.: `my-custom.js` is registered as `myCustomService`, `custom-thing.js` is registered as `customThingService`.