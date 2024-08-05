const User = require("../model/userModel");
const catchAsync = require("../util/catchAsync");
const sendEmail = require("../util/sendMail");
const AppError = require("../model/errorModel");

const fs = require("fs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
  });

  const findUser = await User.findOne({ email });

  if (findUser) {
    return next(new AppError("Email already exists!", 400));
  }

  const user = {
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.url,
    },
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const activationUrl = `${process.env.FRONTEND_URL}/activation?token=${token}`;

  const options = {
    email,
    subject: "Activate your account",
    message: `Your account activation url is:\n\n${activationUrl}`,
  };

  await sendEmail(options);

  res.status(201).json({
    status: "success",
    message: `Your activation mail is sent!`,
  });
});

exports.activateUser = catchAsync(async (req, res, next) => {
  const { activeToken } = req.body;

  const decode = jwt.verify(activeToken, process.env.JWT_SECRET);

  if (!decode) {
    return next(new AppError("Invalid token!Try again", 400));
  }

  const { name, email, password, avatar } = decode;

  const user = await User.create({ name, email, password, avatar });

  const token = user.getToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(201).cookie("jwt", token, cookieOptions).json({
    status: "success",
    user,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Please provide correct credentials", 401));
  }

  const token = user.getToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(200).cookie("jwt", token, cookieOptions).json({
    status: "success",
    user,
    token,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: null,
    token: null,
    message: "User logged Out Successfully!",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email, phoneNumber, password, avatar } = req.body;

  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
  });

  const user = await User.findOne({ email: req.user.email }).select(
    "+password"
  );

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Please provide correct password"));
  }

 

  user.name = name;
  user.email = email;
  user.phoneNumber = phoneNumber;
  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.url,
  };

  await user.save();

  res.status(200).json({
    status: "success",
    user,
    token: req.authToken,
  });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const existingType = user.addresses.find(
    (address) => address.addressType === req.body.addressType
  );

  if (existingType) {
    return next(new AppError(`${req.body.addressType} address already exists`));
  }

  const existingAddress = user.addresses.find(
    (address) => address._id === req.body._id
  );

  if (existingAddress) {
    Object.assign(existingAddress, req.body);
  } else {
    user.addresses.push(req.body);
  }

  await user.save();

  res.status(200).json({
    status: "success",
    user,
    token: req.authToken,
  });
});

exports.deleteAddress = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: { addresses: { _id: req.params.id } },
    }
  );

  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: "success",
    user,
    token: req.authToken,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.comparePassword(req.body.oldPassword))) {
    return next(new AppError("Old password is wrong", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new AppError("New password and confirm password doesnt match", 401)
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  fs.unlink(
    `public/${user.avatar.url.split("/").slice(3).join("/")}`,
    () => {}
  );

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});
