## Install mysql2

```
npm install mysql2
```

## mysql pool create

```
const mysql = require("mysql2");

// connection pool (IMPORTANT for production)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Start@123",
  database: "db_airbnb",
});

module.exports = pool.promise();
```

## Connect in app.js

```
const db = require("./utils/database");

db.execute("SELECT * FROM homes")
  .then(([rows]) => {
    console.log(rows);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

```

## Adding Database in Model

```
//core module
const db = require("../../utils/database");

module.exports = class Home {
  constructor(name, address, price, image, id) {
    this.name = name;
    this.address = address;
    this.price = price;
    this.image = image;
    this.id = id;
  }

  save() {
    return db.execute(
      "INSERT INTO homes (name, address, price, image) VALUES (?, ?, ?, ?)",
      [this.name, this.address, this.price, this.image],
    );
  }
  static update(id = null, updatedHome = null) {
    if (!id || !updatedHome) {
      return Promise.reject(new Error("Invalid input for update"));
    }
    return db.execute(
      "UPDATE homes SET name = ?, address = ?, price = ?, image = ? WHERE id = ?",
      [
        updatedHome.name,
        updatedHome.address,
        updatedHome.price,
        updatedHome.image,
        id,
      ],
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM homes WHERE id = ?", [id]);
  }

  static getAllHomes() {
    return db.execute("SELECT * FROM homes");
  }

  static getHomeById(id) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [id]);
  }
};

```

```
const Home = require("../models/Home");
const NewFavourite = require("../models/NewFavourite");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-edit-home", { title: "Add Home", isEditing: false });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.id;
  const isEditing = req.query.editing === "true";
  console.log(isEditing, homeId);
  if (!isEditing) {
    return res.redirect("/home-list");
  }
  Home.getHomeById(homeId).then(([home]) => {
    console.log(home);
    res.render("host/add-edit-home", {
      title: "Edit Home",
      home: home[0],
      isEditing: isEditing,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { home_name, location, price_per_night, image_url } = req.body;
  const home = new Home(home_name, location, price_per_night, image_url);
  console.log(home);
  home
    .save()
    .then(() => {
      res.render("host/home-added", { title: "Home Added" });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postUpdateHome = (req, res, next) => {
  const { home_name, location, price_per_night, image_url, home_id } = req.body;

  const home = new Home(home_name, location, price_per_night, image_url);

  Home.update(home_id, home)
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const { home_id } = req.body;

  Home.delete(home_id).then(() => {
    res.redirect("/host/home-list");
  });
};

exports.getHomeList = (req, res, next) => {
  Home.getAllHomes().then(([homes]) => {
    res.render("host/host-home-list", {
      homes: homes,
      title: "Hosts Home List",
    });
  });
};
```
