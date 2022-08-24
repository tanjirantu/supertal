import { AbstractEntity } from '../parent.orm.entity';
import { Favorite } from '../favorites/favorite.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Favorite, (entity) => entity.user)
  favorites: Favorite[];
}
