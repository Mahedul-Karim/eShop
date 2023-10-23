const Product = require("../model/productModel");
const Order = require("../model/orderModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../model/errorModel");
const Shop = require("../model/shopModel");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { cart, shippingAddress, totalPrice, paymentInfo } = req.body;

  const shopItems = new Map();

  for (const item of cart) {
    const shopId = item.shopId;

    if (!shopItems.has(shopId)) {
      shopItems.set(shopId, []);
    }
    shopItems.get(shopId).push(item);
  }

  const orders = [];

  for (const [shopId, items] of shopItems) {
    const order = await Order.create({
      cart: items,
      shippingAddress,
      user: req.user,
      totalPrice,
      paymentInfo,
    });
    orders.push(order);
  }
  res.status(201).json({
    status: "success",
    orders,
  });
});

exports.getOrderOfUser = catchAsync(async (req, res, next) => {
  const order = await Order.find({ "user._id": req.user._id });

  if (!order || order.length === 0) {
    return next(new AppError("You do not have any order placed", 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});

exports.getShopOrders = catchAsync(async (req, res, next) => {
  const order = await Order.find({
    "cart.shopId": req.shop._id.toString(),
  }).sort({ createdAt: -1 });

  if (!order || order.length === 0) {
    return next(new AppError("You do not have any order", 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  const shop = await Shop.findById(req.shop._id);

  order.status = req.body.status;

  if (req.body.status === "Delivered") {
    order.paymentInfo.status = "Succeeded";
    order.deliveredAt = Date.now();

    const serviceCharge = order.totalPrice * 0.1;

    const totalPrice = order.totalPrice - serviceCharge;

    shop.availableBalance += totalPrice;

    await shop.save();
  }

  await order.save();

  if (req.body.status === "Transferred to delivery partner") {
    order.cart.forEach(async (o) => {
      const product = await Product.findById(o._id);
      product.stock -= o.quantity;
      product.sold_out += o.quantity;

      await product.save();
    });
  }

  if (req.body.status === "Refund Success") {
    order.cart.forEach(async (o) => {
      const product = await Product.findById(o._id);
      product.stock += o.quantity;
      product.sold_out -= o.quantity;

      await product.save();
    });
  }

  res.status(200).json({
    status: "success",
    order,
    shop,
    token:req.authToken
  });
});

exports.refundOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  order.status = req.body.status;

  await order.save();

  res.status(200).json({
    status: "success",
    order,
    message: "Refund request was successful",
  });
});

exports.getAllOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1, deliveredAt: -1 });

  res.status(200).json({
    status: "success",
    orders,
  });
});
