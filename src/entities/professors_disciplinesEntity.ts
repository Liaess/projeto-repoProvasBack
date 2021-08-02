import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("professors_disciplines")
export default class Professors_disciplines {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  professorsId: number;

  @Column()
  disciplineId: number;
}