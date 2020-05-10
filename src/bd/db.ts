require("dotenv").config();
import { MongoClient } from "mongodb";

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@cluster0-druqv.mongodb.net/test?retryWrites=true&w=majority`;

export class Mongo {
  private static instance: any;

  static getConnection() {
    if (!Mongo.instance) {
      const client = new MongoClient(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      const dbName = process.env.DB_NAME || "dev";
      Mongo.instance = new Promise((resolve, reject) => {
        client.connect((err: any) => {
          if (err) {
            reject(err);
          }
          console.log("Connected succesfully to mongo👾");
          resolve(client.db(dbName));
        });
      });
    }
    return Mongo.instance;
  }
}
