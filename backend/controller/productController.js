const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const catchAsync = require("../util/catchAsync");
const fs = require("fs");
const AppError = require("../model/errorModel");
const Order = require("../model/orderModel");

const cloudinary = require("cloudinary");

exports.createProduct = catchAsync(async (req, res, next) => {
  const images = [];

  for (const img of req.body.images) {
    const myCloud = await cloudinary.v2.uploader.upload(img, {
      folder: "avatars",
    });
    images.push({ public_id: myCloud.public_id, url: myCloud.url });
  }

  const shop = await Shop.findById(req.body.shopId);

  if (!shop) {
    return next(new AppError("Create a shop first to create products", 401));
  }

  req.body.shop = shop;
  const product = await Product.create({ ...req.body, images });

  res.status(201).json({
    status: "success",
    product,
  });
});

exports.getProductDetail = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ name: req.params.name });

  if (product.length === 0) {
    return next(new AppError("No product found!"));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.find({ shopId: req.params.id });

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  product.images.forEach((image) => {
    fs.unlink(`public/${image.url.split("/").slice(3).join("/")}`, () => {});
  });

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});

exports.submitReview = catchAsync(async (req, res, next) => {
  const { user, rating, comment, productId, orderId } = req.body;

  const product = await Product.findById(productId);

  const review = {
    user,
    rating,
    comment,
    productId,
  };

  const isReviewd = product.reviews.findIndex(
    (r) => r.user._id.toString() === user._id.toString()
  );

  const existingReview = product.reviews[isReviewd];

  if (existingReview) {
    product.reviews[isReviewd] = { user, productId, rating, comment };
  } else {
    product.reviews.push(review);
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        "cart.$[elem].isReviewed": true,
      },
    },
    {
      arrayFilters: [{ "elem._id": productId }],
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    product,
    order,
  });
});
