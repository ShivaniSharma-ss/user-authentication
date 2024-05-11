const Users = require("../models/user.model");
const register = async (req, res, next) => {
  if (
    req.body.name?.length < 2 ||
    req.body.email?.length < 7 ||
    req.body.phone?.length != 10 ||
    req.body.password?.length < 8 ||
    typeof req.body.isPublicProfile !== "boolean" ||
    typeof req.body.isAdmin !== "boolean"
  ) {
    res.status(400).json({
      success: false,
      message:
        "Name length should be grater than 1, email length should be greater than 6, phone length should be equal to 10, password length should be greater than 7, privacy is required, isAdmin is required.",
    });
  } else {
    try {
      const user = await Users.findOne({ email: req.body.email }).lean();
      if (user) {
        res.status(400).json({
          success: false,
          message: "User with this email has already been registered",
        });
      } else {
        req.body.password = new Buffer(req.body.password).toString("base64");
        next();
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
};

module.exports = {
  register,
};
