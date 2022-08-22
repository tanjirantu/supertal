import { Artist } from 'src/artists/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // @ManyToMany(() => Artist)
  // @JoinTable()
  // artists: Artist[];

  yearReleased: string;
}
