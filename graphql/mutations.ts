import { Mongo } from "../bd/db";
import { Db } from "mongodb";
import moduleName from "";

export const mutations = {
  createEmployee: async (root, { input }) => {
    let employee;
    try {
      let DB = await Mongo.getConnection();
      employee = await DB.collection("employees").insertOne(input);
      input._id = employee.insertedId;
    } catch (err) {
      console.error(err.message);
    }
    return input;
  },
  crateProject: async (root, { input }) => {
    let project;
    try {
      let DB = await Mongo.getConnection();
      project = await DB.collection("projects").insertOne(input);
      input._id = project.insertedId;
    } catch (err) {
      console.log(err.message);
    }
    return input
  },
};
