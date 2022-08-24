import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Like, Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { GetAlbumFilterDto } from './dto/get-album-filter.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async getAll(filterDto: GetAlbumFilterDto) {
    let queryFilter = {};
    const skip = filterDto?.skip ? filterDto.skip : 0;
    const take = filterDto?.take ? filterDto.take : 10;

    if (filterDto && filterDto.name) {
      queryFilter = {
        name: Like(`%${filterDto.name}%`),
      };
    }

    const [result, total] = await this.albumsRepository.findAndCount({
      relations: {
        artists: true,
        tracks: true,
      },
      where: queryFilter,
      order: { name: 'DESC' },
      skip: skip,
      take: take,
    });
    return {
      albums: result,
      count: total,
    };
  }

  create(album: CreateAlbumDto): Promise<Album> {
    return this.albumsRepository.save(album);
  }
}
