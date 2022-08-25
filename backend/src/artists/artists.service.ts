import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist-dto';
import { ArtistMapper } from './artist.mapper';

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
      artists: result.map(ArtistMapper.mapOrmEntityToInterface),
      count: total,
    };
  }

  async getById(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    return ArtistMapper.mapOrmEntityToInterface(artist);
  }

  async create(artist: CreateArtistDto) {
    const newArtist = await this.artistRepository.save(artist);
    return ArtistMapper.mapOrmEntityToInterface(newArtist);
  }

  async update(id: string, artistDto: UpdateArtistDto) {
    const artist = await this.getById(id);
    artist.name = artistDto.name;

    const updatedArtist = await this.artistRepository.save(artist);
    return ArtistMapper.mapOrmEntityToInterface(updatedArtist);
  }

  async remove(id: string): Promise<void> {
    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID "${id}" not found!`);
    }
  }
}
