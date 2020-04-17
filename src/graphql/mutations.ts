import { Mongo } from "../bd/db";
import {ObjectID} from "mongodb";

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
  editEmployee: async (root, {id, input }) => { 

    let DB;
    let employee=[];
    let project;

    try {
      DB = await Mongo.getConnection();
      if (input.project !== undefined) {
        project = await DB.collection('projects').findOne({ _id: new ObjectID(input.project) });
        if (!project) throw new Error('Project doesnt exist');
        await DB.collection('employees').updateOne(
          { _id: new ObjectID(id) },
          // { $set: input },
          {$addToSet: { project: new ObjectID(input.project)}}
        )
      } else { 
        await DB.collection('employees').updateOne(
          { _id: new ObjectID(id) },
          { $set: input }
        )
      }  
      employee = await DB.collection('employees').findOne({ _id: new ObjectID(id)})     
    } catch (error) {
      console.log(error);
    }
    return employee;
    
  }
};
