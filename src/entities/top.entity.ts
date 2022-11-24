import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bottom } from './bottom.entity';
import { Middle } from './middle.entity';

@Entity()
export class Top {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Middle, (e) => e.top, {
    cascade: ['insert'],
  })
  @JoinTable({ name: 'middle' })
  middles: Middle[];

  @OneToMany(() => Bottom, (e) => e.top, {
    cascade: ['insert'],
  })
  @JoinTable({ name: 'bottom' })
  bottoms: Bottom[];
}
