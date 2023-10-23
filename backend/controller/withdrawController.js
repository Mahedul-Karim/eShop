const Withdraw = require("../model/withdrawModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../model/errorModel");
const Shop = require("../model/shopModel");

exports.requestWithdraw = catchAsync(async (req, res, next) => {
  const data = {
    seller: req.shop,
    amount: req.body.amount,
  };

  const withdraw = await Withdraw.create(data);

  const shop = await Shop.findById(req.shop._id);

  shop.availableBalance -= data.amount;

  await shop.save();

  res.status(201).json({
    status: "success",
    shop,
    token: req.authToken,
  });
});

exports.allWithdraw = catchAsync(async (req, res, next) => {
  const withdraw = await Withdraw.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    withdraw,
  });
});

exports.updateWithdraw = catchAsync(async (req, res, next) => {
  const { sellerId } = req.body;

  const withdraw = await Withdraw.findByIdAndUpdate(
    req.params.id,
    {
      status: "succeed",
      updatedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  const shop = await Shop.findById(sellerId);

  const transection = {
    id: withdraw._id,
    status: "succeed",
    amount: withdraw.amount,
    updatedAt: withdraw.updatedAt,
  };

  shop.transections = [...shop.transections, transection];
 
  await shop.save();

  res.status(200).json({
    status: "success",
    withdraw,
  });
});
