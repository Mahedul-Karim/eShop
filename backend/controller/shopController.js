const Shop = require("../model/shopModel");
const catchAsync = require("../util/catchAsync");
const sendEmail = require("../util/sendMail");
const AppError = require("../model/errorModel");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary=require('cloudinary');

exports.createShop = catchAsync(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
  });

  const seller = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    zipCode: req.body.zipCode,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.url,
    },
  };

  const findSeller = await Shop.findOne({ email: seller.email });

  if (findSeller) {
    return next(new AppError("Email already exists!", 400));
  }

  const token = jwt.sign(seller, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const activationUrl = `${process.env.FRONTEND_URL}/seller?token=${token}`;

  const options = {
    email: seller.email,
    subject: "Activate your seller account",
    message: `Your account activation url is:\n\n${activationUrl}`,
  };

  await sendEmail(options);

  res.status(200).json({
    status: "success",
    message: "Your seller account acitvation mail has been sent!",
  });
});

exports.activateSeller = catchAsync(async (req, res, next) => {
  const { activeToken } = req.body;

  const decode = jwt.verify(activeToken, process.env.JWT_SECRET);

  if (!decode) {
    return next(new AppError("Invalid token!Try again", 400));
  }

  const { name, email, password, phoneNumber, zipCode, avatar, address } =
    decode;

  const shop = await Shop.create({
    name,
    email,
    password,
    phoneNumber,
    zipCode,
    avatar,
    address,
  });

  const token = shop.getJwtToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(201).cookie("shop", token, cookieOptions).json({
    status: "success",
    shop,
    token,
  });
});

exports.shopLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const shop = await Shop.findOne({ email }).select("+password");

  if (!shop || !(await shop.comparePassword(password))) {
    return next(new AppError("Please provide correct credentials", 401));
  }

  const token = shop.getJwtToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(200).cookie("jwt", token, cookieOptions).json({
    status: "success",
    shop,
    token,
  });
});

exports.shopLogout = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    shop: null,
    token: null,
    message: "User loggedut!",
  });
});

exports.getShopData = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  res.status(200).json({
    status: "success",
    shop,
  });
});

exports.updateShop = catchAsync(async (req, res, next) => {

  const { name, description, phoneNumber, zipCode, address,avatar } = req.body;

  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
  });

  const shop = await Shop.findOne({ email: req.shop.email });

  fs.unlink(
    `public/${shop.avatar.url.split("/").slice(3).join("/")}`,
    () => {}
  );

  shop.name = name;
  shop.description = description;
  shop.phoneNumber = phoneNumber;
  shop.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.url,
  };
  shop.zipCode = zipCode;
  shop.address = address;

  await shop.save();

  res.status(200).json({
    status: "success",
    shop,
    token: req.authToken,
  });
});

exports.getAllShop = catchAsync(async (req, res, next) => {
  const shops = await Shop.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    shops,
  });
});

exports.updateWithdrawMethod = catchAsync(async (req, res, next) => {
  const { withdrawMethod } = req.body;

  const shop = await Shop.findByIdAndUpdate(
    req.shop._id,
    { withdrawMethod },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    shop,
    token: req.authToken,
  });
});

exports.deleteWithdrawMethod = catchAsync(async (req, res, next) => {
  const shop = await Shop.findByIdAndUpdate(
    req.shop._id,
    {
      withdrawMethod: null,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    shop,
    token: req.authToken,
  });
});
