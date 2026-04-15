//core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../../utils/pathUtil");

module.exports = class Home {
  constructor(name, address, price, image) {
    this.name = name;
    this.address = address;
    this.price = price;
    this.image = image;
  }

  save() {
    this.id = Math.random().toString(6).slice(2);
    Home.getAllHomes((homes) => {
      homes.push(this);
      const filePath = path.join(rootDir, "public/data", "homes.json");
      fs.writeFile(filePath, JSON.stringify(homes), (err) => {
        if (err) {
          console.error("Error writing to file", err);
        } else {
          console.log("Home saved successfully");
        }
      });
    });
  }

  // static update(id, updatedHome, callback) {
  //   Home.getAllHomes((homes) => {
  //     const homeIndex = homes.findIndex((h) => h.id === id);

  //     if (homeIndex === -1) {
  //       return callback(new Error("Home not found"));
  //     }

  //     // keep same id
  //     homes[homeIndex] = {
  //       ...homes[homeIndex],
  //       ...updatedHome,
  //       id: id,
  //     };

  //     const filePath = path.join(rootDir, "public/data", "homes.json");

  //     fs.writeFile(filePath, JSON.stringify(homes), (err) => {
  //       callback(err);
  //     });
  //   });
  // }

  static update(id, updatedHome, callback) {
    Home.getAllHomes((homes) => {
      const home = homes.find((h) => h.id === id);

      if (!home) {
        return callback(new Error("Home not found"));
      }

      // update manually (very clear)
      home.name = updatedHome.name;
      home.address = updatedHome.address;
      home.price = updatedHome.price;
      home.image = updatedHome.image;

      const filePath = path.join(rootDir, "public/data", "homes.json");

      fs.writeFile(filePath, JSON.stringify(homes), (err) => {
        callback(err);
      });
    });
  }

  static delete(id, callback) {
    Home.getAllHomes((homes) => {
      const updatedHomes = homes.filter((h) => h.id !== id);
      console.log(updatedHomes, id);
      const filePath = path.join(rootDir, "public/data", "homes.json");

      fs.writeFile(filePath, JSON.stringify(updatedHomes), (err) => {
        callback(err);
      });
    });
  }

  static getAllHomes(callback) {
    const filePath = path.join(rootDir, "public/data", "homes.json");
    fs.readFile(filePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
    // const data = await fs.promises.readFile(filePath);
    // const homes = JSON.parse(data);
    // callback(homes);
  }

  static getHomeById(id, callback) {
    console.log(id);
    Home.getAllHomes((homes) => {
      const home = homes.find((h) => h.id === id);
      callback(home);
    });
  }
};
