require("dotenv").config();
import express = require("express");
import gqlMiddleware from "express-graphql";
import cors = require("cors");
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./graphql/resolvers";
import { readFileSync } from "fs";
import { join } from "path";

const { PORT, MODE } = process.env;

const app: express.Application = express();
const isDevConf = MODE === "development" ? true : false;

const typeDefs = readFileSync(
  join(__dirname, "graphql", "schema.graphql"),
  "utf-8"
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors())

app.use(
  "/api",
  gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDevConf,
  })
);

//! Resolver bug de variables de entorno para DEV
app.listen(4000, function () {
  console.log(`Example app listening on port ${PORT}`);
});
