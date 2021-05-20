import { ModelBuilder } from './model.builder';
import { UserQueue } from '../../entities/user-queue.interface';
import { User } from './../../entities/models/user.interface';

export class UserQueueBuilder extends ModelBuilder<UserQueue> {
  constructor() {
    super();

    this.model = {
      users: []
    };
  }

  users(users: User[]): UserQueueBuilder {
    this.model.users = users;

    return this;
  }
}
