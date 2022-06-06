import { Sequelize } from "sequelize";

import dbModels from "../database/models";

const dbConfig = require("./db.config");
const sequelize = new Sequelize(dbConfig);
const modelConfig: any = dbModels.modelsInitialization(sequelize, Sequelize);

modelConfig.sequelize = sequelize;
modelConfig.Sequelize = Sequelize;

const verifyDbConnection = async () => {
  try {
    await modelConfig.sequelize.authenticate();
    console.log("DB Connected !!!");
  } catch (err) {
    console.log(err.message);
  }
};
modelConfig.verifyDbConnection = verifyDbConnection();

export default modelConfig;
