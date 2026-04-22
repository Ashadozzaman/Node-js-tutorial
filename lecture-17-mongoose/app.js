//core module
const path = require("path");

// External Module
const express = require("express");
//Local Module
const storeRouter = require("./routes/storeRouter");
const { hostRoutes } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const { pageNotFound } = require("./app/controllers/ErrorController");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(express.urlencoded());
app.use("/host", hostRoutes);
app.use(storeRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(pageNotFound);

const PORT = 3000;
const MONGOOSE =
  "mongodb+srv://root:Aa1!1234@cluster0.msvvigu.mongodb.net/airbnb?appName=Cluster0";
mongoose
  .connect(MONGOOSE)
  .then(() => {
    console.log("Connected to MongoDB with Mongoose");

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB with Mongoose:", err);
  });
