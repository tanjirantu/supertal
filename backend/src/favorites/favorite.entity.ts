import { Track } from '../tracks/track.entity';
import {
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => Track, (track) => track.id)
  @JoinColumn()
  track: Track;
}
