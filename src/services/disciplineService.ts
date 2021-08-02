import { getRepository } from "typeorm";
import Discipline from "../entities/disciplineEntity";

export async function verifyDiscipline(discipline:string): Promise<Discipline> {
    return await getRepository(Discipline).findOne({ name: discipline });
}