import { Album } from '../albums/album.entity';
import { Entity, Column, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { AbstractEntity } from '../parent.orm.entity';

@Entity()
export class Track extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Artist, (artist) => artist.tracks)
  artists: Artist[];

  @ManyToOne(() => Album, (album) => album.tracks)
  @JoinTable()
  album: Album;
}
