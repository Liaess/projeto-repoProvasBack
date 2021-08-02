import { getRepository } from "typeorm";
import Exam from "../entities/examEntity";

export async function createExam(examName:string, examLink:string, categoryId:number, professorsId:number, disciplineId:number) {
    return await getRepository(Exam).insert({name: examName, examLink, categoryId, professorsId, disciplineId})
}

export async function getAllExamInfos(id:number) {
    return await getRepository(Exam).find({
        where:{disciplineId:id},
        relations: ["category","discipline","professors"],
        order:{id: "ASC"}
    })
}