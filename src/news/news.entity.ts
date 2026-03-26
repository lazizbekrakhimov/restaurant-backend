import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  text: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  authorName: string;

  @Column({ nullable: true })
  authorAvatar: string;

  @CreateDateColumn()
  createdAt: Date;
}
