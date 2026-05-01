const e = require("express");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  number: { type: String, required: false, maxlength: 11 },

  userType: {
    type: String,
    required: true,
    default: "store",
    enum: ["host", "store"],
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Home" }],
});

module.exports = mongoose.model("User", userSchema);
