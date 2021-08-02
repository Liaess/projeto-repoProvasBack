import { getRepository } from "typeorm";
import Professors_disciplines from "../entities/professors_disciplinesEntity";


export async function verifyExistence(professorsId:number, disciplineId:number) {
    return await getRepository(Professors_disciplines).findOne({ professorsId, disciplineId });
}

export async function createProfessorsDisciplinesTable (professorsId:number, disciplineId:number) {
    return await getRepository(Professors_disciplines).insert({ professorsId, disciplineId });
}