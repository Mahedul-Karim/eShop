const Event = require("../model/eventModel");
const Shop = require("../model/shopModel");
const catchAsync = require("../util/catchAsync");
const fs = require("fs");
const AppError = require("../model/errorModel");
const cloudinary = require("cloudinary");

exports.createEvent = catchAsync(async (req, res, next) => {
  const images = [];

  await Promise.all(
    req.body.images.map(async (img) => {
      const myCloud = await cloudinary.v2.uploader.upload(img, {
        folder: "avatars",
      });
      images.push({ public_id: myCloud.public_id, url: myCloud.url });
    })
  );

  const event = await Event.create({ ...req.body, images });

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

  // event.images.forEach((image) => {
  //   fs.unlink(`public/${image.url.split("/").slice(3).join("/")}`, () => {});
  // });

  await Promise.all(
    event.images.map(async (img) => {
      await cloudinary.v2.uploader.destroy(img.public_id);
    })
  );

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});
