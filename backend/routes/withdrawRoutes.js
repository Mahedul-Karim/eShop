const express = require("express");

const { isSeller, isAdmin, protect } = require("../controller/authController");

const {
  requestWithdraw,
  allWithdraw,
  updateWithdraw,
} = require("../controller/withdrawController");

const router = express.Router();

router
  .route("/")
  .post(isSeller, requestWithdraw)
  .get(protect, isAdmin("admin"), allWithdraw);
router.route("/:id").patch(protect, isAdmin("admin"), updateWithdraw);
module.exports = router;
