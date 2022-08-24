import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { In, Repository } from 'typeorm';
import { CreateTrackDto } from './dtos/create-track.dto';
import { Artist } from '..//artists/artist.entity';
import { Album } from '../albums/album.entity';
import { GetTrackFilterDto } from './dtos/get-track-filter.dto';
import { TrackMapper } from './track.mapper';
import { UpdateTrackDto } from './dtos/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async getAll(filter: GetTrackFilterDto) {
    const queryBuilder = this.tracksRepository
      .createQueryBuilder('tr')
      .leftJoinAndSelect('tr.album', 'al')
      .leftJoinAndSelect('tr.artists', 'ar')
      .select(['tr.id', 'tr.name', 'al.name', 'ar.name']);

    if (filter && filter.name) {
      queryBuilder.orWhere('tr.name LIKE :name', {
        name: `%${filter?.name && filter.name}%`,
      });
    }

    if (filter && (filter.album || filter.artist)) {
      queryBuilder.where(`al.name LIKE :album OR ar.name LIKE :artist`, {
        album: `%${filter?.album && filter.album}%`,
        artist: `%${filter?.artist && filter.artist}%`,
      });
    }

    const result = await queryBuilder.getMany();

    return {
      tracks: result.map(TrackMapper.mapOrmEntityToInterface),
      count: result.length,
    };
  }

  async get(id: string) {
    const track = await this.tracksRepository.findOne({
      where: { id },
      relations: {
        album: true,
        artists: true,
      },
    });

    return TrackMapper.mapOrmEntityToInterface(track);
  }

  async create(track: CreateTrackDto) {
    let album = {};
    if (track.album) {
      album = await this.albumsRepository.findOne({
        where: {
          id: track.album,
        },
      });
    }
    const artists = await this.artistsRepository.find({
      where: {
        id: In(track.artists),
      },
    });
    const _track = this.tracksRepository.create({
      name: track.name,
      artists: artists,
      album,
    });

    return _track.save();
  }

  async update(id: string, trackDto: UpdateTrackDto) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Track not found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    track.name = trackDto.name;
    await this.tracksRepository.save(track);

    return TrackMapper.mapOrmEntityToInterface(track);
  }
}
