import { getRepository } from "typeorm";
import Category from "../entities/categoriesEntity";


export async function verifyCategory(name:string){
    return await getRepository(Category).findOne({ name });
}

export async function getAll() {
    return await getRepository(Category).find();
}
