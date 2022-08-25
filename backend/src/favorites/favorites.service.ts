import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Track } from '../tracks/track.entity';
import { User } from '../users/user.entity';
import { FavoriteMapper } from './favorite.mapper';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async getAll(user: User) {
    const [result, total] = await this.favoriteRepository.findAndCount({
      where: { userId: user.id },
      relations: {
        track: true,
      },
    });

    return {
      favorites: result.map(FavoriteMapper.mapOrmEntityToInterface),
      count: total,
    };
  }

  async create(user: User, favoriteDto: CreateFavoriteDto) {
    const track = await this.tracksRepository.findOne({
      where: {
        id: favoriteDto.track,
      },
    });
    const favorite = this.favoriteRepository.create({
      userId: user.id,
      label: favoriteDto.label,
      track,
    });

    favorite.save();
    return FavoriteMapper.mapOrmEntityToInterface(favorite);
  }
}
