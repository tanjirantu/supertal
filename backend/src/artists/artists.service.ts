import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async getAll() {
    const [result, total] = await this.artistRepository.findAndCount({
      relations: {
        albums: true,
        tracks: true,
      },
      order: { name: 'DESC' },
      take: 10,
      skip: 0,
    });
    return {
      artists: result,
      count: total,
    };
  }

  async create(artist: CreateArtistDto): Promise<Artist> {
    return this.artistRepository.save(artist);
  }

  async remove(id: string): Promise<void> {
    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID "${id}" not found!`);
    }
  }
}
