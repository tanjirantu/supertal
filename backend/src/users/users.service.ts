import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserMapper } from './user.mapper';
import { GetUserFilterDto } from './dtos/get-user-filter.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(userFilterDto: GetUserFilterDto) {
    const skip = userFilterDto?.skip ? userFilterDto.skip : 0;
    const take = userFilterDto?.take ? userFilterDto.take : 10;

    let searchCondition = {};

    if (userFilterDto && userFilterDto.username) {
      searchCondition = {
        username: Like(`%${userFilterDto.username}%`),
      };
    }

    if (userFilterDto && userFilterDto.firstName) {
      searchCondition = {
        firstName: Like(`%${userFilterDto.firstName}%`),
      };
    }

    if (userFilterDto && userFilterDto.lastName) {
      searchCondition = {
        lastName: Like(`%${userFilterDto.lastName}%`),
      };
    }

    const [result, total] = await this.usersRepository.findAndCount({
      relations: {
        favorites: true,
      },
      where: searchCondition,
      order: {
        createdAt: 1,
      },
      select: ['favorites'],
      skip: skip,
      take: take,
    });

    return {
      users: result.map(UserMapper.mapOrmEntityToInterface),
      count: total,
    };
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException(`Can not find user with id: ${id}`, 404);
    }
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
