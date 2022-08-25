import { IFavorite } from './interfaces/favorite.interface';
import { Favorite } from './favorite.entity';

class FavoriteMapper {
  static mapOrmEntityToInterface(entity: Favorite): IFavorite {
    return {
      id: entity.id,
      label: entity.label,
      trackName: entity.track?.name ? entity.track.name : '',
    };
  }
}

export { FavoriteMapper };
