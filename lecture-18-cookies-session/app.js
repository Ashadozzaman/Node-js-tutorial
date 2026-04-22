//core module
const path = require("path");

// External Module
const express = require("express");

//Local Module
const storeRouter = require("./routes/storeRouter");
const { hostRoutes } = require("./routes/hostRouter");
const authRouter = require("./routes/authRoute");
const rootDir = require("./utils/pathUtil");
const { pageNotFound } = require("./app/controllers/ErrorController");
const { default: mongoose } = require("mongoose");

const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const MONGOOSE =
  "mongodb+srv://root:Aa1!1234@cluster0.msvvigu.mongodb.net/airbnb?appName=Cluster0";

const store = new MongoDBStore({
  uri: MONGOOSE,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(express.urlencoded());

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRoutes);
app.use(storeRouter);
app.use(authRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(pageNotFound);

const PORT = 3000;
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
