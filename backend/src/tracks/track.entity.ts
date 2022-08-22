import { Album } from 'src/albums/album.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Album)
  @JoinTable()
  album: Album;
}
