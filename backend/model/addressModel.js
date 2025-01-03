const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  addressType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Address", addressSchema);
