import { Mongo } from "../bd/db";
import { ObjectID } from "mongodb";

export const mutations = {
  createEmployee: async (root, { input }) => {
    let employee;
    let project;
    let IdProject
    try {
      const db = await Mongo.getConnection();
      if (input.project !== undefined && input.project !== "") {
        project = await db.collection("projects").findOne({
          _id: new ObjectID(input.project),
        });
        if (!project) throw new Error("Project doesnt exist");
        IdProject =  input.project;
        delete input.project;
        employee = await db.collection("employees").insertOne(input);
        const idEmployee = employee.insertedId;
        employee = await db.collection("employees").updateOne(
          { _id: new ObjectID(idEmployee) },
          {
            $addToSet: { project: new ObjectID(IdProject) },
            $set: input,
          }
        );
        employee = await db.collection("employees").findOne({
          _id: new ObjectID(idEmployee),
        });
      } else {
        employee = await db.collection("employees").insertOne(input);
        input._id = employee.insertedId;
        employee = input;
      }
    } catch (err) {
      console.error(err.message);
    }
    return employee;
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
        await db
          .collection("employees")
          .updateOne({ _id: new ObjectID(id) }, { $set: input });
      }
      employee = await db.collection("employees").findOne({
        _id: new ObjectID(id),
      });
    } catch (error) {
      console.log(error);
    }
    return employee;
  },
  editProject: async (root, { id, input }) => {
    let db;
    let project;
    try {
      db = await Mongo.getConnection();
      await db
        .collection("projects")
        .updateOne({ _id: new ObjectID(id) }, { $set: input });
      project = db.collection("projects").findOne({ _id: new ObjectID(id) });
    } catch (error) {
      console.log(error);
    }
    return project;
  },
  deleteEmployee: async (root, { id }) => {
    let db;
    let employees;
    try {
      db = await Mongo.getConnection();
      await db.collection("employees").deleteOne({ _id: new ObjectID(id) });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  },
  deleteProject: async (root, { id }) => {
    let db;
    try {
      db = await Mongo.getConnection();
      await db.collection("projects").deleteOne({ _id: new ObjectID(id) });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  },
};
