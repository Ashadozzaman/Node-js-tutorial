Here’s your **clean, corrected, and completed notes** for MongoDB. I fixed spelling, added missing parts, and structured it properly so you can use it for study or documentation.

---

# 📘 Introduction to MongoDB

## 1. What is MongoDB?

- **MongoDB** is both a **product** and the **company** that develops it (MongoDB Inc.).
- The name comes from the word **“humongous”**, meaning large-scale data handling.

### 🔹 Key Characteristics

- **NoSQL Database**
  MongoDB is a _NoSQL (Not Only SQL)_ database that stores data in flexible formats instead of traditional tables.

- **Document-Oriented**
  Stores data as **JSON-like documents (BSON)** instead of rows and columns.

- **Schema-less**
  Documents in the same collection can have **different structures**.

- **High Performance**
  Optimized for fast **read and write** operations.

- **Scalability**
  Supports **horizontal scaling** using **sharding**.

- **High Availability**
  Uses **replication** (Replica Sets) with **automatic failover**.

- **Rich Query Capabilities**
  Supports:
  - Filtering
  - Sorting
  - Aggregation (reports & analytics)

- **Geospatial & Text Search**
  - Location-based queries
  - Full-text search support

- **Cross-platform**
  Works on Linux, Windows, macOS.

- **Easy Integration**
  Works smoothly with modern stacks like Node.js, Laravel, etc.

---

## 2. Setting Up MongoDB (Node.js)

### Install MongoDB Driver

```bash
npm install mongodb
```

---

## 3. MongoDB Driver

- Official Node.js driver lets you connect and interact with MongoDB.
- Provides APIs for CRUD operations.

---

## 4. Creating MongoDB Connection

```js
const { MongoClient } = require("mongodb");

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017")
    .then((client) => {
      console.log("Connected!");
      _db = client.db("myDatabase");
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (!_db) {
    throw "No database found!";
  }
  return _db;
};

module.exports = { mongoConnect, getDB };
```

---

## 5. Saving a Home (Insert Data)

```js
const saveHome = (home) => {
  const db = getDB();
  return db.collection("homes").insertOne(home);
};
```

---

## 6. Install MongoDB Compass

- GUI tool for MongoDB → MongoDB Compass
- Helps you:
  - View data
  - Run queries
  - Analyze collections

---

## 7. MongoDB in VS Code

Use extension:

- MongoDB for VS Code (official)

Features:

- Connect database
- Run queries
- Explore collections

---

## 8. Fetching All Homes

### 🔹 Explanation

- `find()` retrieves documents
- Returns a **cursor** (iterator)
- Use `.toArray()` to get actual data

```js
const fetchHomes = () => {
  const db = getDB();
  return db.collection("homes").find().toArray();
};
```

---

## 9. Fetching One Home

```js
const { ObjectId } = require("mongodb");

const fetchHomeById = (homeId) => {
  const db = getDB();
  return db
    .collection("homes")
    .find({ _id: new ObjectId(homeId) })
    .next();
};
```

---

## 10. Update & Delete

### 🔹 Update

```js
const updateHome = (id, updatedData) => {
  const db = getDB();
  return db
    .collection("homes")
    .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
};
```

### 🔹 Delete

```js
const deleteHome = (id) => {
  const db = getDB();
  return db.collection("homes").deleteOne({ _id: new ObjectId(id) });
};
```

---

## 11. Adding MongoDB to Favourite (Compass)

In **MongoDB Compass**:

- Save connection string
- Click ⭐ “Favorite”
- Quickly reconnect later

---

## 🔑 Important Concepts Summary

- **Database → Collection → Document**
- JSON-like structure (BSON)
- Flexible schema
- CRUD operations:
  - Create → `insertOne`
  - Read → `find`
  - Update → `updateOne`
  - Delete → `deleteOne`

---

## ✅ Bonus Tips (Practical)

- Always validate data before insert/update
- Use indexes for performance:

```js
db.collection("homes").createIndex({ price: 1 });
```

- Use environment variables for DB URL:

```bash
MONGO_URI=mongodb://localhost:27017
```

---

Here’s your MongoDB content converted into **interview-ready questions & answers**—structured from basic → advanced so you can prepare efficiently.

---

# 🎯 MongoDB Interview Questions & Answers

## 🟢 Basic Level

### 1. What is MongoDB?

**Answer:**
MongoDB is a NoSQL, document-oriented database developed by MongoDB Inc.. It stores data in flexible, JSON-like documents (BSON) instead of traditional tables.

---

### 2. What does NoSQL mean?

**Answer:**
NoSQL stands for **“Not Only SQL”**. It refers to databases that do not use traditional relational table structures and instead use flexible data models like documents, key-value, graph, etc.

---

### 3. What is a document in MongoDB?

**Answer:**
A document is a single record in MongoDB stored in **BSON format** (binary JSON). It contains key-value pairs.

Example:

```json
{
  "name": "House A",
  "price": 12000
}
```

---

### 4. What is a collection?

**Answer:**
A collection is a group of MongoDB documents (similar to a table in SQL).

---

### 5. Difference between MongoDB and SQL databases?

| Feature   | MongoDB    | SQL      |
| --------- | ---------- | -------- |
| Structure | Document   | Table    |
| Schema    | Flexible   | Fixed    |
| Scaling   | Horizontal | Vertical |
| Query     | JSON-like  | SQL      |

---

## 🟡 Intermediate Level

### 6. How do you install MongoDB driver in Node.js?

```bash
npm install mongodb
```

---

### 7. How do you connect to MongoDB in Node.js?

**Answer:**

```js
const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017").then((client) => {
  const db = client.db("myDB");
});
```

---

### 8. What is a cursor in MongoDB?

**Answer:**
A cursor is a pointer to the result set of a query. It allows you to iterate over documents.

Example:

```js
collection.find();
```

To get data:

```js
collection.find().toArray();
```

---

### 9. How do you insert data in MongoDB?

```js
db.collection("homes").insertOne({
  name: "House A",
  price: 12000,
});
```

---

### 10. How do you fetch all documents?

```js
db.collection("homes").find().toArray();
```

---

### 11. How do you fetch a single document?

```js
db.collection("homes")
  .find({ _id: new ObjectId(id) })
  .next();
```

---

### 12. How do you update a document?

```js
db.collection("homes").updateOne(
  { _id: new ObjectId(id) },
  { $set: { price: 15000 } },
);
```

---

### 13. How do you delete a document?

```js
db.collection("homes").deleteOne({ _id: new ObjectId(id) });
```

---

## 🔵 Advanced Level

### 14. What is sharding?

**Answer:**
Sharding is a method of **horizontal scaling** where data is distributed across multiple servers.

---

### 15. What is replication?

**Answer:**
Replication creates multiple copies of data across servers (Replica Sets) to ensure **high availability** and **automatic failover**.

---

### 16. What is indexing in MongoDB?

**Answer:**
Indexes improve query performance by allowing faster data retrieval.

Example:

```js
db.collection("homes").createIndex({ price: 1 });
```

---

### 17. What is aggregation?

**Answer:**
Aggregation is used for data processing and reporting (similar to SQL GROUP BY).

Example:

```js
db.collection("homes").aggregate([
  { $group: { _id: "$address", total: { $sum: "$price" } } },
]);
```

---

### 18. What is BSON?

**Answer:**
BSON (Binary JSON) is the format MongoDB uses to store data. It is more efficient than JSON and supports additional data types.

---

### 19. What are advantages of MongoDB?

**Answer:**

- Flexible schema
- High performance
- Scalable
- Easy integration
- Supports large datasets

---

### 20. What is MongoDB Compass?

**Answer:**
MongoDB Compass is a GUI tool used to:

- Visualize data
- Run queries
- Manage databases easily

---

## 🔥 Practical / Real-World Questions

### 21. When should you use MongoDB?

**Answer:**

- Dynamic schema applications
- Large-scale apps
- Real-time analytics
- Microservices architecture

---

### 22. When should you NOT use MongoDB?

**Answer:**

- Complex transactions (banking systems)
- Strong relational data requirements
- Strict schema enforcement needed

---

### 23. How do you handle relationships in MongoDB?

**Answer:**

- **Embedding** (store related data inside document)
- **Referencing** (store ObjectId of another document)

---

### 24. What is the difference between `find()` and `findOne()`?

| Method    | Description                         |
| --------- | ----------------------------------- |
| find()    | Returns multiple documents (cursor) |
| findOne() | Returns a single document           |

---

### 25. How do you improve MongoDB performance?

**Answer:**

- Use indexes
- Limit fields (`projection`)
- Use pagination
- Optimize queries
- Avoid unnecessary data

---

## 🚀 Bonus (For Senior/DevOps Role)

### 26. How do you scale MongoDB in production?

**Answer:**

- Use **sharding**
- Configure **replica sets**
- Use **load balancing**
- Monitor using tools like MongoDB Atlas

---

### 27. How do you secure MongoDB?

**Answer:**

- Enable authentication
- Use roles & permissions
- Restrict IP access
- Use SSL/TLS

---
