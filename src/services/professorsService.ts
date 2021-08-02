import { getRepository } from "typeorm";
import Professors from "../entities/professorsEntity";

export async function verifyProfessors(name:string): Promise<Professors> {
  return await getRepository(Professors).findOne({ name });
}

export async function createProfessors(name:string){
    return (await getRepository(Professors).insert({ name })).generatedMaps[0].id;
  }