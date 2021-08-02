import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import Exam from "./examEntity";

@Entity("category")
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(()=> Exam, exam => exam.categoryId) 
  exam: Exam[];
  
}