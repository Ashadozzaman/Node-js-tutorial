const mongoose = require("mongoose");

const FavSchema = mongoose.Schema({
  homeId: { type: mongoose.Schema.Types.ObjectId, ref: "Home", required: true },
});

module.exports = mongoose.model("NewFavourite", FavSchema);
