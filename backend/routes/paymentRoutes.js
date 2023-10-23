const express = require("express");

const { getPayment,getApiKey } = require("../controller/paymentController");


const router = express.Router();

router.route("/stripe").post(getPayment);
router.route("/stripe/apikey").get(getApiKey);


module.exports = router;
