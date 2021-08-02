import { Request, Response } from "express";
import { idSchemaFindDisciplines } from "../schemas/disciplineSchemas";
import { getAll, getAllDisciplinesWithProfessorRelations } from "../services/disciplineService";
import { getAllExamInfos } from "../services/examService";


export async function getAllDisciplines(req: Request, res: Response) {
    try{
      const result = await getAll()
      res.send(result)
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
}

export async function getDisciplineById(req: Request, res: Response) {
  const id:number = Number(req.params.id);
  try{
    const value = idSchemaFindDisciplines.validate({id:id});
    if(value.error)res.sendStatus(400);
    const result = await getAllExamInfos(id)
    res.send(result)
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getListOfDisciplinesWithProfessors(req: Request, res: Response) {
  try{
    const result = await getAllDisciplinesWithProfessorRelations()
    let filtered = result.filter((e)=>e.professor.length !== 0);
    res.send(filtered)
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}