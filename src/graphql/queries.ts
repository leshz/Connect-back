import { Mongo } from "../bd/db";
import {ObjectID} from 'mongodb';

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
  getEmployeeByID: async (root, { id }) => {
    let db;
    let employees;

    try {
      db = await Mongo.getConnection();
      employees = db.collection("employees").findOne({_id: new ObjectID(id)})
    } catch (err) {
      console.log(err);
    }
    return employees;
  },
  getProjectByID: async (root, { id }) => { 
    let db;
    let project;
    try {
      db = await Mongo.getConnection()
      project = db.collection('projects').findOne({_id: new ObjectID(id) })
    } catch (error) {
      
    }
    return project
  },
  getEmployessByProject: async (root, { idProject }) => { 
    let db;
    let employess = [];
    try {
      db = await Mongo.getConnection();  
      const information = idProject !== "" ? new ObjectID(idProject) : null;       
      employess = db.collection("employees").find({ project: { $all: [information] }}).toArray();      
    } catch (error) {
      console.log(error);
    }
    return employess;
  }
};
