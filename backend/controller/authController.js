const AppError = require("../model/errorModel");
const catchAsync = require("../util/catchAsync");
const User = require("../model/userModel");
const Shop = require("../model/shopModel");

const jwt = require("jsonwebtoken");

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Login or signup to access this resources"));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id).select("+password");

  req.user = user;
  req.authToken = token;
  next();
});

exports.isSeller = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Login or SignUp to access this resources", 401));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const shop = await Shop.findById(decode.id);

  req.shop = shop;
  req.authToken = token;
  next();
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to access this route", 401)
      );
    }
    next()
  };
};
