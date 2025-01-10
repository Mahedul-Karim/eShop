const express = require("express");

const { createCoupon,getCoupons,deleteCoupon,getCouponByName } = require("../controller/couponController");
const { isSeller } = require("../controller/authController");

const router = express.Router();

router.route("/").post(isSeller, createCoupon);
router.route('/:id').get(getCoupons).delete(deleteCoupon);
router.route('/shop/:name').post(getCouponByName);

module.exports = router;
