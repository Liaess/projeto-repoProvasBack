import { getRepository } from "typeorm";
import Exam from "../../src/entities/examEntity";
import Professors from "../../src/entities/professorsEntity";
import Professors_disciplines from "../../src/entities/professors_disciplinesEntity";
import Discipline from "../../src/entities/disciplineEntity";

export async function clearDatabase () {
  await getRepository(Exam).delete({});
  await getRepository(Professors_disciplines).delete({});
  await getRepository(Discipline).delete({});
  await getRepository(Professors).delete({});
}

export async function createDiscipline(name:string) {
  await getRepository(Discipline).insert({ name, semesterId: 1 });
}

export async function createNewProfessor(name:string, discipline:string){
await createDiscipline(discipline);
await getRepository(Professors).insert({name});
const professorsId = await getRepository(Professors).findOne({name});
const disciplineId = await getRepository(Discipline).findOne({name: discipline});
await getRepository(Professors_disciplines).insert({ professorsId:professorsId.id, disciplineId:disciplineId.id });
}

export async function findProfessor(name:string) {
return await getRepository(Professors).findOne({name});
}

export async function findDiscipline(name:string) {
  return await getRepository(Discipline).findOne({name});
}

export async function findExam(examLink: string) {
  return await getRepository(Exam).findOne({examLink})
}