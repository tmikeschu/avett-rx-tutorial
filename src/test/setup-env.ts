import "@testing-library/jest-dom";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { server } from "mocks/server";

beforeEach(() => {
  // console.log("before each");
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export {};
