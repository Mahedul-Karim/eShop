const express = require("express");

const {
  createConv,
  createMessage,
  sellerConv,
  updateLastMessage,
  getMessages
} = require("../controller/conversationController");
const { protect, isSeller } = require("../controller/authController");
const { upload } = require('../util/fileUpload');

const router = express.Router();

router.route("/").post(protect, createConv)
router.route("/:id").get(sellerConv).patch(updateLastMessage);
router.route("/message").post(upload.single('images'),createMessage);
router.route("/message/:id").get(getMessages);



module.exports = router;
