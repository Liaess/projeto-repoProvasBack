import { getRepository } from "typeorm";
import Category from "../entities/categoryEntity";


export async function verifyCategory(name:string){
    return await getRepository(Category).findOne({ name });
}