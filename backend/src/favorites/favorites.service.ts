import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { In, Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Track } from '../tracks/track.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  getAll(): Promise<Favorite[]> {
    return this.favoriteRepository.find();
  }

  async create(user: User, favoriteDto: CreateFavoriteDto) {
    const tracks = await this.tracksRepository.find({
      where: {
        id: In(favoriteDto.tracks),
      },
    });
    const track = this.favoriteRepository.create({
      userId: user.id,
      label: favoriteDto.label,
      tracks,
    });

    return track;
    // return _track.save();
  }
}
