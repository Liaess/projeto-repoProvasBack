import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { disciplineBody, examInformation, professorsBody } from "../factories/bodyFactory";
import { clearDatabase, createNewProfessor, } from "../utils/database";

beforeAll(async () => {
    await init();
});
  
  beforeEach(async () => {
    await clearDatabase();
});
  
  afterAll(async () => {
    await getConnection().close();
});

describe("POST /new-exam", ()=>{
    it("should answer with 201 when sucefully create exam", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P1", professor: professorName, discipline: disciplineName });
        expect(response.status).toEqual(201);
    });

    it("should answer with 400 when missing examName", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: "", examLink: examInfo.examLink, category: "P1", professor: professorName, discipline: disciplineName });
        expect(response.status).toEqual(400);
    });

    it("should answer with 400 when missing examLink", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: "", category: "P1", professor: professorName, discipline: disciplineName });
        expect(response.status).toEqual(400);
    });

    it("should answer with 400 when missing category", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "", professor: professorName, discipline: disciplineName });
        expect(response.status).toEqual(400);
    });

    it("should answer with 400 when missing professor", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P1", professor: "", discipline: disciplineName });
        expect(response.status).toEqual(400);
    });

    it("should answer with 400 when missing discipline", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P1", professor: professorName, discipline: "" });
        expect(response.status).toEqual(400);
    });

    it("should answer with 406 when trying to create exam with not included category on database", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P5", professor: professorName, discipline: disciplineName  });
        expect(response.status).toEqual(406);
    });

    it("should answer with 406 when trying to create exam with not included professor on database", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        const notIncludedProfessor = professorsBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P1", professor: notIncludedProfessor, discipline: disciplineName  });
        expect(response.status).toEqual(406);
    });

    it("should answer with 406 when trying to create exam with not included discipline on database", async ()=>{
        const professorName = professorsBody();
        const disciplineName = disciplineBody();
        const notIncludedDiscipline = disciplineBody();
        await createNewProfessor(professorName, disciplineName);
        const examInfo = examInformation();
        const response = await supertest(app).post("/new-exam").send({examName: examInfo.name, examLink: examInfo.examLink, category: "P1", professor: professorName, discipline: notIncludedDiscipline  });
        expect(response.status).toEqual(406);
    });
});