const AppError = require("../model/errorModel");

const fs = require("fs");

exports.handleError = (err, req, res, next) => {
  const status = err.status || 500;

  if (req.file) {
    fs.unlink(req.file.path,()=>{});
  }

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(status).json({
      status: "failed",
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      const message = "Resources not found for this id";
      error = new AppError(message, 404);
    }

    if (err.name === "JsonWebTokenError") {
      const message = "Your url is invalid!Please try again later";
      error = new AppError(message, 400);
    }

    if (err.name === "TokenExpired") {
      const message = "Your url has expired!Please try again later!";
      error = new AppError(message, 400);
    }

    if(err.code === 11000){
      const message=`Duplicate ${Object.keys(err.keyValue)}`;
      error=new AppError(message,400);
    }

    res.status(status).json({
      status: "failed",
      message: error.message || "Internel Server error",
    });
  }
};
