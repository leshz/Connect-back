import { Mongo } from "../bd/db";
import { ObjectID } from "mongodb";

export const mutations = {
  createEmployee: async (root, { input }) => {
    let employee;
    try {
      const db = await Mongo.getConnection();
      employee = await db.collection("employees").insertOne(input);
      input._id = employee.insertedId;
    } catch (err) {
      console.error(err.message);
    }
    return input;
  },
  crateProject: async (root, { input }) => {
    let project;
    try {
      const db = await Mongo.getConnection();
      project = await db.collection("projects").insertOne(input);
      input._id = project.insertedId;
    } catch (err) {
      console.log(err.message);
    }
    return input;
  },
  editEmployee: async (root, { id, input }) => {
    let db;
    let employee = [];
    let project;

    try {
      db = await Mongo.getConnection();
      if (input.project !== undefined && input.project !== "") {
        const idProject = input.project;
        delete input.project;
        project = await db.collection("projects").findOne({
          _id: new ObjectID(idProject),
        });
        if (!project) throw new Error("Project doesnt exist");
        await db.collection("employees").updateOne(
          { _id: new ObjectID(id) },
          {
            $addToSet: { project: new ObjectID(idProject) },
            $set: input,
          }
        );
      } else {
        input.project = [];
        await db.collection("employees").updateOne(
          { _id: new ObjectID(id) },
          { $set: input }
        );
      }
      employee = await db.collection("employees").findOne({
        _id: new ObjectID(id),
      });
    } catch (error) {
      console.log(error);
    }
    return employee;
  },
  editProject: async (root, { id }) => { 
    let db;
    let project;
    try {
      db = await Mongo.getConnection()
      project = db.collection('prjects').findOne({_id: new ObjectID(id) })
    } catch (error) {
      
    }
    return project
  }
};
