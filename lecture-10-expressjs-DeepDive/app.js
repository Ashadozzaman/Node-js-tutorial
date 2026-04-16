// Simple Node js server
const express = require("express");
const bodyParser = require("body-parser");
const requestHandler = require("./user");

const app = express();

app.get("/", (req, res, next) => {
  console.log("Middleware 1", req.url, req.method);
  res.send("<h1>Hello from Express Server!</h1>");
  next();
});

app.get("/details", (req, res, next) => {
  console.log("Middleware 3", req.url, req.method);
  res.send(`
    <h1>Details Page</h1>
    <form action="/contact-us" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"> 
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/contact-us", (req, res, next) => {
  console.log("Heading Contact for POST", req.url, req.method, req.body);
  console.log("Form Data:", req.body);
  next();
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log("Middleware 4", req.url, req.method);
  console.log("Form Data:", req.body);
  res.send("Contact form submitted successfully!");
});

app.post("/submit", (req, res, next) => {
  console.log("Middleware 2", req.url, req.method);
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
