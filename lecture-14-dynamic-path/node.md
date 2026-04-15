## Dynamic Path

1. Add Details Button for each house
2. Add a unique id to each homes
3. Add a unique id on home object before saving in the model
4. Add fatch route with fatch/put route controller

### Add Params route

```
storeRouter.get("/home/:id", storeController.getHomeDetails);
```

- Route cal in controller

```
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.id;
  Home.getHomeById(homeId, (home) => {
    if (home) {
      res.render("store/home-details", { home: home, title: "Home Details" });
    } else {
      res.status(404).render("store/404", { title: "Home Not Found" });
    }
  });
};
```

- **getHomeById** how call with **callback** function

```
static getHomeById(id, callback) {
    console.log(id);
    Home.getAllHomes((homes) => {
      const home = homes.find((h) => h.id === id);
      callback(home);
    });
  }
```
