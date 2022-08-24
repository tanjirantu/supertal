import { IsNotEmpty } from 'class-validator';
import { Artist } from '../../artists/artist.entity';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  artists: Artist[];
}
