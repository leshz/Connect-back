import { Mongo } from "../bd/db";
import { Db } from "mongodb";

export const mutations = {
  createEmployee: async (root, { input }) => {
    let employee;
    try {
      let DB = await Mongo.getConnection();
      employee = await DB.collection('employee').insertOne(input)
      input._id = employee.insertedId;
    } catch (err) {
      console.error(err.message);
    }
    return input;
  },
};
