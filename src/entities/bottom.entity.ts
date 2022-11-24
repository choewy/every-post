import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Top } from './top.entity';
import { Middle } from './middle.entity';

@Entity()
export class Bottom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Top, (e) => e.bottoms, { cascade: true })
  @JoinColumn({ name: 'top_id' })
  top: Top;

  @ManyToOne(() => Middle, (e) => e.bottoms, { cascade: true })
  @JoinColumn({ name: 'middle_id' })
  middle: Middle;
}
