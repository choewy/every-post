import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bottom } from './bottom.entity';
import { Top } from './top.entity';

@Entity()
export class Middle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Top, (e) => e.middles)
  @JoinColumn({ name: 'top_id' })
  top: Top;

  @OneToMany(() => Bottom, (e) => e.middle, { cascade: ['insert'] })
  bottoms: Bottom[];
}
