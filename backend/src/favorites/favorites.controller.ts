import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(AuthGuard())
  getAll(@GetUser() user: User) {
    return this.favoritesService.getAll(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() favorite: CreateFavoriteDto, @GetUser() user: User) {
    return this.favoritesService.create(user, favorite);
  }
}
