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

describe("GET /get-all-disciplines", ()=>{
  it("should answer with 200 when searching for all disciplines", async ()=>{
    const response = await supertest(app).get("/get-all-disciplines");
    expect(response.body).toEqual(expect.any(Array));
  });
});