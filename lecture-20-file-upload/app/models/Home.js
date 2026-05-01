const mongoose = require("mongoose");
const User = require("./User");
// const NewFavourite = require("./NewFavourite");

const homeSchema = mongoose.Schema({
  name: { type: String, required: true },

  address: { type: String, required: true },

  price: { type: Number, required: true },

  image: { type: String, required: true },
});

homeSchema.pre("findOneAndDelete", async function () {
  console.log("Pre middleware triggered for home deletion");

  const homeId = this.getQuery()._id;

  // await NewFavourite.deleteMany({ homeId: homeId });
  await User.updateMany(
    { favourites: homeId },
    { $pull: { favourites: homeId } },
  );
});

module.exports = mongoose.model("Home", homeSchema);
