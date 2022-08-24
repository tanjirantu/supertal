import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        favorites: true,
      },
      select: ['favorites'],
    });
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    return UserMapper.mapOrmEntityToInterface(user);
  }

  async create(createUserDto: CreateUserDto) {
    const { username, password, firstName, lastName } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });
    try {
      const userData = await this.usersRepository.save(user);
      return UserMapper.mapOrmEntityToInterface(userData);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateMyProfile(updateUserDto: UpdateUserDto, user: User) {
    const _user = await this.getById(user.id);

    if (updateUserDto.firstName) {
      _user.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      _user.lastName = updateUserDto.lastName;
    }

    const updatedUser = await this.usersRepository.save(_user);
    return UserMapper.mapOrmEntityToInterface(updatedUser);
  }

  async update(id: string, userDto: UpdateUserDto) {
    const user = await this.getById(id);

    if (userDto.firstName) {
      user.firstName = userDto.firstName;
    }

    if (userDto.lastName) {
      user.lastName = userDto.lastName;
    }

    await this.usersRepository.save(user);

    return user;
  }
}
