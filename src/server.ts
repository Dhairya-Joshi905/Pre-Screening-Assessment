import * as core from "express-serve-static-core";
import bodyParser from "body-parser";
import express from "express";

import modelConfig from "./config/model.config";
import routes from "../src/routes/customer.route";

require("dotenv").config();

export async function createServer(): Promise<core.Express> {
  const server: core.Express = express();
  server.use(bodyParser.json());
  server.use("/", routes);
  // server.use(error());
  return server;
}

export async function startServer(
  expressServer: core.Express
): Promise<core.Express> {
  // verify db connection
  await modelConfig.verifyDbConnection;
  expressServer.listen(process.env.PORT);
  console.log(`Server started on port ${process.env.PORT}.`);
  return expressServer;
}
