import { Request, Response } from "express";
import { examCreationSchema } from "../schemas/examSchemas";
import { verifyDiscipline } from "../services/disciplineService";
import { verifyProfessors } from "../services/professorsService";
import { createExam } from "../services/examService";
import { verifyCategory } from "../services/categoryService";

export async function newExam(req: Request, res: Response) {
    const { examName, examLink, category, professor, discipline } = req.body;
    const value = examCreationSchema.validate({examName, examLink, category, professor, discipline});
    if(value.error) return res.sendStatus(400);
    try{
        const checkCategory = await verifyCategory(category);
        if(!checkCategory) return res.sendStatus(406);
        const checkProfessor = await verifyProfessors(professor);
        if(!checkProfessor) return res.sendStatus(406);
        const checkDiscipline = await verifyDiscipline(discipline);
        if(!checkDiscipline) return res.sendStatus(406);
        await createExam(examName, examLink, checkCategory.id, checkProfessor.id, checkDiscipline.id);
        res.sendStatus(201);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}