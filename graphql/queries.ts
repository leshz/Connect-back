import { Mongo } from "../bd/db";

export const queries = {
  getAllEmployees: async () => {
    let db;
    let employess = [];
    try {
      db = await Mongo.getConnection()
      employess = db.collection('employee').fin().toArray();
    }
    catch (err) { 
      console.error(err.message);
    }
    return employess;
  },
};
