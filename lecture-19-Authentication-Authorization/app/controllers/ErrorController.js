const { use } = require("react");

exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", { title: "Page Not Found", user: req.session.user });
};

exports.serverError = (err, req, res, next) => {
  res
    .status(500)
    .render("500", { title: "Server Error", user: req.session.user });
};
