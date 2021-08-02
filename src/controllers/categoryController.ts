import { Request, Response } from "express";
import { getAll } from "../services/categoriesService";

export async function getAllCategories(req: Request, res: Response) {
    try{
      const result = await getAll()
      res.send(result)
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
}