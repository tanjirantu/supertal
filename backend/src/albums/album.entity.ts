import { Artist } from '../artists/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Track } from '../tracks/track.entity';
import { AbstractEntity } from '../parent.orm.entity';

@Entity()
export class Album extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Artist, (artist) => artist.albums)
  @JoinTable()
  artists: Artist[];

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  yearReleased: string;
}
