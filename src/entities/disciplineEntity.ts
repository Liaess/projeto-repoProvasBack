import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import Exam from "./examEntity";
import Professors from "./professorsEntity";

@Entity("discipline")
export default class Discipline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  semesterId: number;

  @ManyToMany(()=> Professors, professor => professor.discipline)
  @JoinTable({name: "professors_disciplines"})
  professor: Professors[];

  @OneToMany(()=> Exam, exam => exam.disciplineId) 
  exam: Exam[];
}