import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserFilterDto } from './dtos/get-user-filter.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async getAll(@Query() userFilterDto: GetUserFilterDto) {
    return await this.usersService.getAll(userFilterDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @UseGuards(AuthGuard())
  @Get('/me/profile')
  getMyProfile(@GetUser() user: User) {
    return this.usersService.getById(user.id);
  }

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard())
  @Put('/me')
  public async updateMyProfile(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.usersService.updateMyProfile(updateUserDto, user);
  }

  @Put('/:id')
  public async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }
}
