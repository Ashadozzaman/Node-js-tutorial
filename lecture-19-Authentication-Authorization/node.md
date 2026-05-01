Here’s your **Mongoose introduction** converted into **interview questions (with answers)**—clean, structured, and useful for real interviews 👇

---

# 📘 Mongoose Interview Questions & Answers

## 🔹 1. What is Mongoose?

**Q:** What is Mongoose and why is it used?
**A:**
Mongoose is an Object Data Modeling (ODM) library for Node.js and MongoDB. It provides a schema-based structure to model application data, making it easier to validate, cast, and manage data. It also simplifies database interactions using built-in methods and supports middleware for pre/post operations.

---

## 🔹 2. Why use Mongoose instead of the native MongoDB driver?

**Q:** What advantages does Mongoose provide over the native MongoDB driver?
**A:**

- Schema-based structure
- Built-in validation
- Middleware support (pre/post hooks)
- Data relationships (populate)
- Cleaner and more readable code
- Automatic type casting

---

## 🔹 3. How do you set up Mongoose in a Node.js application?

**Q:** How do you install and connect Mongoose?
**A:**

1. Install:

```bash
npm install mongoose
```

2. Connect:

```js
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));
```

---

## 🔹 4. How do you create a Schema in Mongoose?

**Q:** What is a Schema and how do you define one?
**A:**
A schema defines the structure of documents in a collection.

```js
const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  name: String,
  address: String,
  price: Number,
  image: String,
});
```

---

## 🔹 5. What is a Model in Mongoose?

**Q:** What is the difference between Schema and Model?
**A:**

- **Schema:** Defines structure
- **Model:** Used to interact with the database

```js
const Home = mongoose.model("Home", homeSchema);
```

---

## 🔹 6. How do you save data using Mongoose?

**Q:** How do you insert a document into MongoDB using Mongoose?
**A:**

```js
const home = new Home({
  name: "Khan Villa",
  address: "Dhaka",
  price: 12000,
  image: "image.jpg",
});

home
  .save()
  .then(() => console.log("Saved"))
  .catch((err) => console.log(err));
```

---

## 🔹 7. How do you fetch all documents?

**Q:** How do you retrieve all records from a collection?
**A:**

```js
Home.find().then((homes) => console.log(homes));
```

---

## 🔹 8. How do you fetch a single document?

**Q:** How do you get one specific record?
**A:**

```js
Home.findById(id).then((home) => console.log(home));
```

or

```js
Home.findOne({ name: "Khan Villa" });
```

---

## 🔹 9. How do you delete a document?

**Q:** How do you delete data in Mongoose?
**A:**

```js
Home.findByIdAndDelete(id).then(() => console.log("Deleted"));
```

---

## 🔹 10. What is middleware in Mongoose?

**Q:** What are pre and post middleware hooks?
**A:**
Middleware functions run before or after certain operations.

Example:

```js
homeSchema.pre("findOneAndDelete", async function (next) {
  console.log("Deleting home...");
  next();
});
```

---

## 🔹 11. How do you manage relationships in Mongoose?

**Q:** How do you create relationships between collections?
**A:**
Using `ref` and ObjectId.

```js
const favouriteSchema = new mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
  },
});
```

---

## 🔹 12. What is populate in Mongoose?

**Q:** How do you fetch related data?
**A:**

```js
Favourite.find()
  .populate("homeId")
  .then((data) => console.log(data));
```

---

## 🔹 13. What is type casting in Mongoose?

**Q:** What is automatic type casting?
**A:**
Mongoose automatically converts data into the defined schema type (e.g., string to number).

---

## 🔹 14. What is validation in Mongoose?

**Q:** How do you validate data?
**A:**

```js
const homeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0 },
});
```

---

## 🔹 15. What are common Mongoose methods?

**Q:** Name some commonly used Mongoose methods.
**A:**

- `save()`
- `find()`
- `findById()`
- `findOne()`
- `findByIdAndUpdate()`
- `findByIdAndDelete()`

---

## 🔹 16. What are the limitations of Mongoose?

**Q:** What are some downsides of using Mongoose?
**A:**

- Slight performance overhead
- Less flexibility than raw MongoDB driver
- Learning curve for beginners

---
