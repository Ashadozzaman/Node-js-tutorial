const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const MONGODB_URI =
  "mongodb+srv://root:Aa1!1234@cluster0.msvvigu.mongodb.net/?appName=Cluster0";
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGODB_URI)
    .then((client) => {
      callback(); // Pass the client;
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found"); // "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
