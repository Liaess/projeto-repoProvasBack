import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { disciplineBody, examInformation, professorsBody } from "../factories/bodyFactory";
import { clearDatabase, createNewProfessor, findDiscipline, findExam, findProfessor} from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /get-all-disciplines", ()=>{
  it("should answer with 200 when searching for all disciplines", async ()=>{
    const response = await supertest(app).get("/get-all-disciplines");
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe("GET /disciplines/:id", ()=>{
  it("should answer with 200 when trying get disciplines exams by id", async ()=>{
    const name = professorsBody();
    const discipline = disciplineBody();
    await createNewProfessor(name, discipline);
    const examInfo = examInformation();
    const professor = await findProfessor(name);
    const disciplineOnDatabase = await findDiscipline(discipline);
    await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P1", professor: professor.name, discipline: disciplineOnDatabase.name });
    const result = await findExam(examInfo.examLink);
    const response = await supertest(app).get(`/disciplines/${result.disciplineId}`);
    expect(response.status).toEqual(200);
  });

  it("should answer with 400 when missing params", async ()=>{
    const name = professorsBody();
    const discipline = disciplineBody();
    await createNewProfessor(name, discipline);
    const examInfo = examInformation();
    const professor = await findProfessor(name);
    const disciplineOnDatabase = await findDiscipline(discipline);
    await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P1", professor: professor.name, discipline: disciplineOnDatabase.name });
    const result = await findExam(examInfo.examLink);
    const response = await supertest(app).get(`/disciplines/${result.id+5}`)
    expect(response.status).toEqual(401);
  });
});

describe("GET /listOfDisciplinesWithExams", ()=>{
  it("should answer with 200 when sucefully get ", async ()=>{
    const name = professorsBody();
    const discipline = disciplineBody();
    await createNewProfessor(name, discipline);
    const examInfo = examInformation();
    const professor = await findProfessor(name);
    const disciplineOnDatabase = await findDiscipline(discipline);
    await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P1", professor: professor.name, discipline: disciplineOnDatabase.name });
    const response = await supertest(app).get(`/listOfDisciplinesWithExams`);
    expect(response.body.length).toEqual(1);
  });
});