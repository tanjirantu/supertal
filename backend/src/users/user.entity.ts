// import { BaseEntity } from 'src/base.entity';
import { Favorite } from 'src/favorites/favorite.entity';
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @ManyToMany(() => Favorite)
  // @JoinTable()
  // favorites: Favorite[];
}
