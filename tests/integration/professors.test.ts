import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { professorsBody, disciplineBody, completeBody } from "../factories/bodyFactory";
import { clearDatabase } from "../utils/database";
import { createDiscipline } from "../utils/database";
import { createNewProfessor, findProfessor } from "../utils/database";

beforeAll(async () => {
    await init();
  });
  
  beforeEach(async () => {
    await clearDatabase();
  });
  
  afterAll(async () => {
    await getConnection().close();
});

describe("POST /new-professor", () => {

    it("should answer with 201 on sucess on create professor", async () => {
      const name = professorsBody();
      const discipline = disciplineBody();
      await createDiscipline(discipline);
      const response = await supertest(app).post("/new-professor").send({name, discipline});
      expect(response.status).toEqual(201);
    });
  
    it("should answer with 409 on conflict when trying to create professor", async () => {
      const name = professorsBody();
      const discipline = disciplineBody();
      await createNewProfessor(name, discipline);
      const response = await supertest(app).post("/new-professor").send({name, discipline});
      expect(response.status).toEqual(409);
    });
  
    it("should answer with 400 when missing body name", async () => {
      const body = completeBody();
      const response = await supertest(app).post("/new-professor").send({...body, name:""});
      expect(response.status).toEqual(400);
    });
  
    it("should answer with 400 when missing body discipline", async () => {
      const body = completeBody();
      const response = await supertest(app).post("/new-professor").send({...body, discipline:""});
      expect(response.status).toEqual(400);
    });
  
    it("should answer with 400 when trying to create professor with non listed discipline", async () => {
      const body = completeBody();
      const secondDiscipline = disciplineBody();
      const response = await supertest(app).post("/new-professor").send({...body, discipline:secondDiscipline});
      expect(response.status).toEqual(400);
    });
  
    it("should answer with 400 when sending body name with wrong property", async () => {
      const body = completeBody();
      const response = await supertest(app).post("/new-professor").send({...body, name:123});
      expect(response.status).toEqual(400);
    });
  
    it("should answer with 400 when sending body discipline with wrong property", async () => {
      const body = completeBody();
      const response = await supertest(app).post("/new-professor").send({...body, discipline:123});
      expect(response.status).toEqual(400);
    });
  
});

describe("post /find-professorsId", ()=>{
    it("should answer with 200 when trying to find the correct professor using id", async ()=>{
      const name = professorsBody();
      const discipline = disciplineBody();
      await createNewProfessor(name, discipline);
      const professor = await findProfessor(name);
      const response = await supertest(app).post("/find-professorsId").send({id:professor.id});
      expect(response.status).toEqual(200);
    });
  
    it("should answer with 400 when trying to find the correct professor using id but with wrong id", async ()=>{
      const name = professorsBody();
      const response = await supertest(app).post("/find-professorsId").send({id: name});
      expect(response.status).toEqual(400);
    });
  
    it("should answer with 400 when trying to find the correct professor using id but with empty params", async ()=>{
      const name = professorsBody();
      const response = await supertest(app).post("/find-professorsId").send({id: ""});
      expect(response.status).toEqual(400);
    });
});