import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Category, cat => cat.items, { eager: true, nullable: true })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;
}
