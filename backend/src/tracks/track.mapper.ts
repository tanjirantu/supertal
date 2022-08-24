import { ITrack } from './interfaces/track.interface';
import { Track } from './track.entity';

class TrackMapper {
  static mapOrmEntityToInterface(entity: Track): ITrack {
    return {
      id: entity.id,
      name: entity?.name,
      album: entity?.album?.name,
      artists: entity?.artists?.length
        ? entity.artists.map((artist) => artist?.name)
        : [],
    };
  }
}

export { TrackMapper };
