const express = require("express");

const { upload } = require("../util/fileUpload");

const {
  createProduct,
  getProduct,
  deleteProduct,
  getAllProducts,
  getProductDetail,
  submitReview,
  searchProduct
} = require("../controller/productController");

const { protect } = require('../controller/authController');

const router = express.Router();

router.route("/search").post(searchProduct);
router.route("/create-product").post(createProduct);
router.route("/:id").get(getProduct).delete(deleteProduct);
router.route("/").get(getAllProducts);
router.route("/single/:name").get(getProductDetail);
router.route("/review").post(protect,submitReview);


module.exports = router;
