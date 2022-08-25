import { Artist } from './artist.entity';
import { IArtist } from './interfaces/artist.interface';

class ArtistMapper {
  static mapOrmEntityToInterface(entity: Artist): IArtist {
    return {
      id: entity.id,
      name: entity?.name,
    };
  }
}

export { ArtistMapper };
