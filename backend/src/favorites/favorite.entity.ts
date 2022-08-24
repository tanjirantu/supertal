import { Track } from '../tracks/track.entity';
import {
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { AbstractEntity } from '../parent.orm.entity';

@Entity()
export class Favorite extends AbstractEntity {
  @Column()
  label: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.favorites, {
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];
}
