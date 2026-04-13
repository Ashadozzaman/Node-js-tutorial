//core module
const path = require("path");

// External Module
const express = require("express");
//Local Module
const userRoutes = require("./routes/userRouter");
const { hostRoutes } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(express.urlencoded());
app.use("/host", hostRoutes);
app.use(userRoutes);

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
