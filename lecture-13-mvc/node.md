## Need of dynamic UI

1. Personalized Content
2. Dynamic Data deliery
3. Scurity And access control
4. Localization and Internationalization
5. API Versatility

## Sharing using global variables

## what is EJS

1. HTML with JS:
2. Simple Syntex: Uses <% %> for control flow and <%= %> for output.
3. Easy To Learn:
4. Template Reuse:
5. Flexible Logic:

### After **EJS** install mut be **set** in root app js

```
app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));
```

### How to use EJS

```
userRouter.get("/", (req, res, next) => {
  console.log(homes);
  res.render("home", { homes: homes, title: "Home Page" });
});
```

```
<% homes.forEach(home => { %>
    <div class="bg-white p-4 rounded shadow">
    <h2 class="text-xl font-semibold mb-2"><%= home.name %></h2>
    <p class="text-gray-600 mb-1">Location: <%= home.address %></p>
    <p class="text-gray-600 mb-1">Price per Night: $<%= home.price %></p>
    </div>
<% }) %>
```

## Controller & Routes & Model(MVC)

### Routes

```
// External Module
const express = require("express");
const hostRouter = express.Router();
const homeController = require("../app/controllers/HomeController");

hostRouter.get("/add-home", homeController.getAddHome);
hostRouter.post("/add-home", homeController.postAddHome);

exports.hostRoutes = hostRouter;

```

### Controllers

```
exports.getAddHome = (req, res, next) => {
  res.render("add-home", { title: "Add Home" });
};

const homes = [];
exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  homes.push({
    name: req.body.home_name,
    address: req.body.location,
    price: req.body.price_per_night,
    image: req.body.image_url,
  }); // console.log(req.body);
  res.render("homeAdded", { title: "Home Added" });
};

exports.getHome = (req, res, next) => {
  console.log(homes);
  res.render("home", { homes: homes, title: "Home Page" });
};
```

### Model

```
// Dummy Database
const homes = [];

module.exports = class Home {
  constructor(name, address, price, image) {
    this.name = name;
    this.address = address;
    this.price = price;
    this.image = image;
  }

  save() {
    homes.push(this);
  }

  static getAllHomes() {
    return homes;
  }
};

```

### Writing data to files

```
const filePath = path.join(rootDir, "public/data", "homes.json");
    fs.writeFile(filePath, JSON.stringify(homes), (err) => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        console.log("Home saved successfully");
      }
    });

```

### Reading Data From Files

```
static getAllHomes(callback) {
    const filePath = path.join(rootDir, "public/data", "homes.json");
    fs.readFile(filePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
    // const data = await fs.promises.readFile(filePath);
    // const homes = JSON.parse(data);
    // callback(homes);
  }
```
