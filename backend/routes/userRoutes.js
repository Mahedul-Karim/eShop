const express = require("express");

const { upload } = require("../util/fileUpload");
const { protect, isAdmin } = require("../controller/authController");
const {
  createUser,
  activateUser,
  login,
  getUser,
  updateUser,
  logout,
  updateAddress,
  deleteAddress,
  updatePassword,
  getUserById,
  getAllUser,
  deleteUser
} = require("../controller/userController");

const router = express.Router();

router
  .route("/")
  .post(upload.single("image"), createUser)
  .patch(upload.single("image"), protect, updateUser);
router.route("/activation").post(activateUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(protect, getUser);
router.route("/address").patch(protect, updateAddress);
router.route("/address/:id").delete(protect, deleteAddress);
router.route("/updatePassword").patch(protect, updatePassword);
router.route("/:id").get(getUserById).delete(protect, isAdmin("admin"),deleteUser);
router.route("/admin/shop").get(protect, isAdmin("admin"), getAllUser);

module.exports = router;
