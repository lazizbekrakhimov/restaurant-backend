import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('galleries')
export class Gallery {
  @PrimaryGeneratedColumn() id: number;
  @Column() image: string;
  @Column({ nullable: true }) title: string;
  @CreateDateColumn() createdAt: Date;
}
