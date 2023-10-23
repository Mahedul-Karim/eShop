const Coupon = require("../model/couponModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../model/errorModel");

exports.createCoupon = catchAsync(async (req, res, next) => {
  const existingCoupon = await Coupon.find({ name: req.body.name });

  if (existingCoupon && existingCoupon.length !== 0) {
    return next(new AppError("Coupon already exists", 400));
  }

  req.body.shopId = req.shop._id;

  const coupon = await Coupon.create(req.body);

  res.status(200).json({
    status: "success",
    coupon,
  });
});

exports.getCoupons = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find({ shopId: req.params.id });

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

exports.getCouponByName=catchAsync(async (req,res,next)=>{

  const coupon=await Coupon.findOne({name :{ $regex:req.params.name }})

  if(!coupon){
    return next(new AppError("Coupon code doesn't exist or has expired",404))
  }

  res.status(200).json({
    status:'success',
    coupon
  })

})