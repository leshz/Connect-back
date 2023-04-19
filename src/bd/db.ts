require("dotenv").config();
import { MongoClient } from "mongodb";

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@${process.env.DB_NAME}.eqv49nx.mongodb.net/?retryWrites=true&w=majority`;

export class Mongo {
  private static instance;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static getConnection() {
    if (!Mongo.instance) {
      const client = new MongoClient(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      const dbName = process.env.DB_NAME || "dev";
      Mongo.instance = new Promise((resolve, reject) => {
        client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log("Connected succesfully to mongo 👾");
          resolve(client.db(dbName));
        });
      });
    }
    return Mongo.instance;
  }
}
