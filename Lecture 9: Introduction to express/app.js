// Simple Node js server
const express = require("express");
const requestHandler = require("./user");

const app = express();

app.use("/", (req, res, next) => {
  console.log("Middleware 1", req.url, req.method);
  next();
});

app.use("/submit", (req, res, next) => {
  console.log("Middleware 2", req.url, req.method);
  res.send("<h1>Hello from Express Server!</h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
