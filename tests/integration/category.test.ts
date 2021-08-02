import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
    await init();
});
  
  beforeEach(async () => {
    await clearDatabase();
});
  
  afterAll(async () => {
    await getConnection().close();
});

describe("/GET /get-all-categories", ()=>{
    it("should answer with 200 when searching for all categories", async () => {
       const response = await supertest(app).get("/get-all-categories");
       expect(response.body).toEqual(expect.any(Array));
    });
});