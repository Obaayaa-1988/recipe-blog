const jwt = require("jsonwebtoken");

// error handling function

module.exports.handleErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email already exist please Login";
  }

  if (err.message.includes("Logger validation failed")) {
    Object.values(err.errors).forEach((prop) => {
      if (prop.path === "username") {
        errors.username = prop.message;
      }

      if (prop.path === "email") {
        errors.email = prop.message;
      }

      if (prop.path === "password") {
        errors.password = prop.message;
      }
    });
  }
  return errors;

};

// function for jwt token generation

module.exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60 * 1000,
  });
};
