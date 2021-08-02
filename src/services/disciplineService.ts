import { getRepository } from "typeorm";
import Discipline from "../entities/disciplineEntity";

export async function verifyDiscipline(discipline:string): Promise<Discipline> {
    return await getRepository(Discipline).findOne({ name: discipline });
}

export async function getAll() {
    return await getRepository(Discipline).find();
}

export async function getDisciplinesWithProfessorsRelations(id:number) {
    return await getRepository(Discipline).findOne(id,{
      relations: ["professor"]
    })
}