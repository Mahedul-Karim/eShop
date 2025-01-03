const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const catchAsync = require("../util/catchAsync");
const fs = require("fs");
const AppError = require("../model/errorModel");
const Order = require("../model/orderModel");

const cloudinary = require("cloudinary");

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, description, category, tags, price, stock, shopId, images } =
    req.body;

  const uploadedImages = [];

  await Promise.all(
    images.map(async (img) => {
      const myCloud = await cloudinary.v2.uploader.upload(img, {
        folder: "avatars",
      });
      uploadedImages.push({ public_id: myCloud.public_id, url: myCloud.url });
    })
  );

  const product = await Product.create({
    name,
    description,
    category,
    tags,
    price,
    stock,
    shop: shopId,
    images: uploadedImages,
  });

  res.status(201).json({
    status: "success",
    product,
  });
});

exports.getProductDetail = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ name: req.params.name }).populate(
    "shop",
    "name avatar"
  );

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
  const product = await Product.find({ shop: req.params.id });

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  await Promise.all(
    product.images.map(async (img) => {
      await cloudinary.v2.uploader.destroy(img.public_id);
    })
  );

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

exports.searchProduct = catchAsync(async (req, res, next) => {
  const {
    searchText,
    catValue = "All",
    ratingValue = 0,
    page: currentPage,
    minValue = 0,
    maxValue = 2000,
  } = req.body;

  const productCount = await Product.countDocuments();

  const itemsPerPage = 10;

  const skipedPage = itemsPerPage * (currentPage - 1);

  let query = {};

  query.price = {
    $lte: maxValue,
    $gte: minValue,
  };

  if (searchText) {
    query.name = {
      $regex: searchText,
      $options: "i",
    };
  }

  if (catValue !== "All") {
    query.category = {
      $regex: catValue,
      $options: "i",
    };
  }

  if (ratingValue.length !== 0) {
    query.ratings = {
      $in: ratingValue,
    };
  }

  const products = await Product.find(query)
    .sort({ ratings: -1, createdAt: -1, price: -1 })
    .limit(itemsPerPage)
    .skip(skipedPage);

  if (products.length === 0) {
    return next(new AppError("No Products found!"));
  }
  res.status(200).json({
    status: "success",
    products,
    total: productCount,
  });
});
