import { Request, Response } from "express";
import { professorsCreationSchema } from "../schemas/professorsSchemas";
import { verifyDiscipline } from "../services/disciplineService";
import { verifyProfessors, createProfessors } from "../services/professorsService";
import { verifyExistence, createProfessorsDisciplinesTable } from "../services/professors_disciplinesService";

export async function newProfessor (req: Request, res: Response){
    const { name, discipline } = req.body;
    try{
      const value = professorsCreationSchema.validate({ name, discipline });
      if(value.error) return res.sendStatus(400);
      const checkDisciplineName = await verifyDiscipline(discipline);
      if(!checkDisciplineName) return res.sendStatus(400);
      const checkProfessorName = await verifyProfessors(name);
      if(checkProfessorName){
        const checkExistenceOnDatabase = await verifyExistence(checkProfessorName.id, checkDisciplineName.id);
        if(checkExistenceOnDatabase){
          return res.sendStatus(409);
        }else{
          await createProfessorsDisciplinesTable(checkProfessorName.id, checkDisciplineName.id,);
          return res.sendStatus(201);
        }
      }else{
        const id = await createProfessors(name);
        await createProfessorsDisciplinesTable(id, checkDisciplineName.id,);
        res.sendStatus(201);
      }
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
}