const Coupon = require("../model/couponModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../model/errorModel");

exports.createCoupon = catchAsync(async (req, res, next) => {
  const existingCoupon = await Coupon.findOne({
    name: req.body.name,
    shop: req.shop._id,
  });

  if (existingCoupon) {
    return next(new AppError("Coupon already exists", 400));
  }

  req.body.shop = req.shop._id;

  const coupon = await Coupon.create(req.body);

  res.status(200).json({
    status: "success",
    coupon,
  });
});

exports.getCoupons = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find({ shop: req.params.id });

  res.status(200).json({
    status: "success",
    coupons,
  });
});

exports.deleteCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Coupon deleted",
  });
});

exports.getCouponByName = catchAsync(async (req, res, next) => {
  const { arrayData } = req.body;

  const coupon = await Coupon.findOne({ name: { $regex: req.params.name } });

  const isEligible = arrayData.includes(coupon.shop.toString());

  

  if (!isEligible) {
    return next(
      new AppError("This coupon is not eligible for this product", 401)
    );
  }

  if (!coupon) {
    return next(new AppError("Coupon code doesn't exist or has expired", 404));
  }

  if (coupon && coupon.usedFor === coupon.maxUsage) {
    return next(new AppError("Coupon has reached maximum usage", 404));
  }

  coupon.usedFor = coupon.usedFor + 1;
  await coupon.save();

  res.status(200).json({
    status: "success",
    coupon,
  });
});
