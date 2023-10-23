const express = require("express");

const { upload } = require("../util/fileUpload");
const { protect, isSeller, isAdmin } = require("../controller/authController");
const {
  createShop,
  activateSeller,
  shopLogin,
  shopLogout,
  getShopData,
  updateShop,
  getAllShop,
  updateWithdrawMethod,
  deleteWithdrawMethod,
} = require("../controller/shopController");

const router = express.Router();

router.route("/create-shop").post(upload.single("image"), createShop);
router.route("/activate-shop").post(activateSeller);
router.route("/shop-login").post(shopLogin);
router.route("/shop-logout").get(shopLogout);
router.route("/:id").get(getShopData);
router
  .route("/")
  .patch(upload.single("image"), isSeller, updateShop)
  .get(protect, isAdmin("admin"), getAllShop)
  .put(isSeller, updateWithdrawMethod)
  .delete(isSeller, deleteWithdrawMethod);

module.exports = router;
