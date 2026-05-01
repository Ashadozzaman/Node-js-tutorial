const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const e = require("express");
const { isLength } = require("lodash");

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    title: "Signup Page",
    isLoggedIn: false,
    errorMessage: null,
    user: { username: "", email: "", number: "", userType: "" },
    oldInput: { username: "", email: "", number: "", userType: "" },
  });
};

exports.postSignup = [
  check("username")
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be between 2 and 30 characters")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Username must be alphanumeric"),
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)
    .withMessage("Password must contain at least one letter and one number"),

  check("confirmPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  check("terms")
    .equals("on")
    .withMessage("You must accept the terms and conditions"),
  check("userType").notEmpty().withMessage("User type is required"),

  (req, res, next) => {
    const {
      username: username,
      email: email,
      number: number,
      userType: userType,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res.status(422).render("auth/signup", {
        title: "Signup Page",
        isLoggedIn: false,
        errorMessage: errors.array().map((err) => err.msg),
        oldInput: {
          username: username,
          email: email,
          number: number,
          userType: userType,
        },
        user: { username: "", email: "", number: "", userType: "" },
      });
    }

    const user = new User({
      username: username,
      email: email,
      number: number,
      userType: userType,
      password: req.body.password,
    });

    bcrypt
      .hash(user.password, 12)
      .then((hashedPassword) => {
        user.password = hashedPassword;
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).render("auth/signup", {
          title: "Signup Page",
          isLoggedIn: false,
          errorMessage:
            "An error occurred while creating the account. Please try again.",
          oldInput: {
            username: username,
            email: email,
            number: number,
            userType: userType,
          },
          user: { username: "", email: "", number: "", userType: "" },
        });
      });
  },
];
exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", {
    title: "Login Page",
    isLoggedIn: false,
    errorMessage: null,
    oldInput: { email: "", password: "" },
    user: { username: "", email: "", number: "", userType: "" },
  });
};

exports.postLogin = async (req, res, next) => {
  const { email: email, password: password } = req.body;
  // In a real application, you would validate the email and password against a database
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return res.status(401).render("auth/login", {
      title: "Login Page",
      isLoggedIn: false,
      errorMessage: ["User not found"],
      oldInput: { email: email, password: "" },
      user: { username: "", email: "", number: "", userType: "" },
    });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).render("auth/login", {
      title: "Login Page",
      isLoggedIn: false,
      errorMessage: ["Invalid password"],
      oldInput: { email: email, password: "" },
      user: { username: "", email: "", number: "", userType: "" },
    });
  }
  console.log(user);
  req.session.isLoggedIn = true;
  req.session.user = {
    _id: user._id.toString(), // ✅ convert ObjectId to string
    email: user.email,
    username: user.username,
    number: user.number,
    userType: user.userType,
  };
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  //   res.cookie("isLoggedIn", false);
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
