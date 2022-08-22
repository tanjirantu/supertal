import { Album } from 'src/albums/album.entity';
import { Track } from 'src/tracks/track.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];
}
