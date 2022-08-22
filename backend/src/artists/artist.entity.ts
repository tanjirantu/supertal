import { Album } from 'src/albums/album.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // @ManyToMany(() => Album)
  // @JoinTable()
  // albums: Album[];
}
