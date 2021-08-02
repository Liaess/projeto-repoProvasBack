import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import Discipline from "./disciplineEntity";
import Exam from "./examEntity";

@Entity("professors")
export default class Professors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(()=> Discipline, discipline => discipline.professor)
  @JoinTable({name: "professors_disciplines"})
  discipline: Discipline[]  

  @OneToMany(()=> Exam, exam => exam.professorsId) 
  exam: Exam[];
}