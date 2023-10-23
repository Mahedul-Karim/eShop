const express = require("express");

const { upload } = require("../util/fileUpload");

const {
  createEvent,
  getEvent,
  deleteEvent,
  allEvents
} = require("../controller/eventController");

const router = express.Router();

router.route("/").post(upload.array("images"), createEvent).get(allEvents);
router.route("/:id").get(getEvent).delete(deleteEvent);

module.exports = router;
