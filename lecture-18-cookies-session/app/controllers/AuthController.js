exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", { title: "Login Page", isLoggedIn: false });
};

exports.postLogin = (req, res, next) => {
  const { email: email, password: password } = req.body;
  // In a real application, you would validate the email and password against a database
  if (email && password) {
    // req.isLoggedIn = true;
    // res.cookie("isLoggedIn", true);
    req.session.isLoggedIn = true;
    res.redirect("/");
  } else {
    res.status(401).render("auth/login", {
      title: "Login Page",
      errorMessage: "Invalid email or password",
    });
  }
};

exports.postLogout = (req, res, next) => {
  //   res.cookie("isLoggedIn", false);
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
