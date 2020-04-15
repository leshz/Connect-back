import { Mongo } from "../bd/db";

export const queries = {
  getAllEmployees: async () => {
    let db;
    let employess = [];
    try {
      db = await Mongo.getConnection();
      employess = db.collection("employees").find().toArray();
    } catch (err) {
      console.error(err.message);
    }
    return employess;
  },
  getAllProjects: async () => {
    let db;
    let projects = [];
    try {
      db = await Mongo.getConnection();
      projects = db.collection("projects").find().toArray();
    } catch (err) {
      console.error(err.message);
    }
    return projects;
  },
};
