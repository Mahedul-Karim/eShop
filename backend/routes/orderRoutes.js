const express = require("express");

const {
  createOrder,
  getOrderOfUser,
  getShopOrders,
  updateOrder,
  refundOrder,
  getAllOrder
} = require("../controller/orderController");
const { protect, isSeller,isAdmin } = require("../controller/authController");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getOrderOfUser);
router.route("/shop").get(isSeller, getShopOrders);
router
  .route("/shop/:id")
  .patch(isSeller, updateOrder)
  .put(isSeller, refundOrder);
router.route('/admin').get(protect,isAdmin('admin'),getAllOrder);
module.exports = router;
