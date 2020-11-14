import request from "supertest";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "../../schema";

test("hello world query", async () => {
  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
    })
  );

  const query = `
        query {
            hello
        }
    `;

  const response = await request(app)
    .get("/graphql")
    .type("json")
    .send(JSON.stringify({ query }));

  expect(JSON.parse(response.text)).toEqual({
    data: {
      hello: "world",
    },
  });
});
