import "./setup";
import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";
import { newProfessor } from "./controllers/newProfessor";
import { newExam } from "./controllers/newExam";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/new-professor", newProfessor);
app.post("/new-exam", newExam)
export async function init () {
  await connectDatabase();
}

export default app;
