//core module
const path = require("path");
// External Module
const express = require("express");
const bodyParser = require("body-parser");
//Local Module
const hostRoutes = require("./routes/hostRouter");
const userRoutes = require("./routes/userRouter");
const rootDir = require("./utils/pathUtil");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("/host", hostRoutes);
app.use(userRoutes);

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./views/404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
