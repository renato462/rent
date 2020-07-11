exports.getLogin = (req, res, next) => {
  res.render("auth/login");
};

exports.getRegister = (req, res, next) => {
  res.render("auth/register");
};
