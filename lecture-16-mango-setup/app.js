//core module
const path = require("path");

// External Module
const express = require("express");
//Local Module
const storeRouter = require("./routes/storeRouter");
const { hostRoutes } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const { pageNotFound } = require("./app/controllers/ErrorController");
const { mongoConnect } = require("./utils/mongodb");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(express.urlencoded());
app.use("/host", hostRoutes);
app.use(storeRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(pageNotFound);

const PORT = 3000;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
