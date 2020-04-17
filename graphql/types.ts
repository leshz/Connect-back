import { Mongo } from "../bd/db";
import { ObjectID } from "mongodb";

export const types = {
  Employee: {
    project: async ({ project }) => {
      let DB;
      let projectsID;
      let projectsData;
      try {
        DB = await Mongo.getConnection();
        projectsID = project ? project.map((id) => ObjectID(id)) : [];
        if (projectsID.length > 0) {
          projectsData = await DB.collection("projects")
            .find({ _id: { $in: projectsID } })
            .toArray();
        } else {
          projectsData = [];
        }
      } catch (error) {
        console.log(error);
      }
      return projectsData;
    },
  },
};
