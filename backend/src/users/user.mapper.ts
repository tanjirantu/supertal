import { IUser } from './interfaces/user.interface';
import { User } from './user.entity';

class UserMapper {
  static mapOrmEntityToInterface(entity: User): IUser {
    return {
      id: entity.id,
      firstName: entity?.firstName,
      lastName: entity?.lastName,
      username: entity?.username,
      createdAt: entity?.createdAt,
    };
  }
}

export { UserMapper };
