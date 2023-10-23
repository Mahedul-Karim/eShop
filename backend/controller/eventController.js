const Event = require("../model/eventModel");
const Shop = require("../model/shopModel");
const catchAsync = require("../util/catchAsync");
const fs = require("fs");
const AppError = require("../model/errorModel");

exports.createEvent = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.images = req.files.map((file) => {
      return {
        public_id: "fdf",
        url: `${req.protocol}://${req.get("host")}/${
          file.destination.split("/")[1]
        }/${file.filename}`,
      };
    });
  }

  const shop = await Shop.findById(req.body.shopId);

  if (!shop) {
    return next(new AppError("Create a shop first to create products", 401));
  }

  req.body.shop = shop;
  const event = await Event.create(req.body);

  res.status(201).json({
    status: "success",
    event,
  });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.find({ shopId: req.params.id });

  res.status(200).json({
    status: "success",
    event,
  });
});

exports.allEvents = catchAsync(async (req, res, next) => {
  const event = await Event.find();

  res.status(200).json({
    status: "success",
    event,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  event.images.forEach((image) => {
    fs.unlink(`public/${image.url.split("/").slice(3).join("/")}`, () => {});
  });

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});
