exports.pageNotFound = (req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
};

exports.serverError = (err, req, res, next) => {
  res.status(500).render("500", { title: "Server Error" });
};
