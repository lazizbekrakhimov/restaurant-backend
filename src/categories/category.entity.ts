import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from '../menu/menu-item.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column({ nullable: true }) nameRu: string;
  @OneToMany(() => MenuItem, item => item.category) items: MenuItem[];
}
