import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import Category from "./categoryEntity";
import Discipline from "./disciplineEntity";
import Professors from "./professorsEntity";

@Entity("exam")
export default class Exam{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    examLink: string;

    @Column()
    categoryId: number;

    @Column()
    professorsId: number;

    @Column()
    disciplineId: number;

    @ManyToOne(()=>Category, category => category.id)
    category: Category[];

    @ManyToOne(()=>Discipline, discipline => discipline.id)
    discipline: Discipline[];

    @ManyToOne(()=>Professors, professors => professors.id)
    professors: Professors[];
}