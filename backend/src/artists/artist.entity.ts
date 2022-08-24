import { Album } from '../albums/album.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Track } from '../tracks/track.entity';
import { AbstractEntity } from '../parent.orm.entity';

@Entity()
export class Artist extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Track, (track) => track.artists)
  @JoinTable()
  tracks: Track[];

  @ManyToMany(() => Album, (album) => album.artists)
  @JoinTable()
  albums: Album[];
}
