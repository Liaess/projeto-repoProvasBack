import "./setup";
import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";
import { findProfessorsId, newProfessor } from "./controllers/professorController";
import { newExam } from "./controllers/examController";
import { getAllDisciplines } from "./controllers/disciplineController";
import { getAllCategories } from "./controllers/categoryController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/new-professor", newProfessor);
app.post("/new-exam", newExam);
app.get("/get-all-disciplines", getAllDisciplines);
app.get("/get-all-categories", getAllCategories);
app.post("/find-professorsId", findProfessorsId);

export async function init () {
  await connectDatabase();
}

export default app;
