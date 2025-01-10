const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupoun code name!"],
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },

  shop: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Shop",
  },
  usedFor: {
    type: Number,
    default: 0,
  },
  maxUsage: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CoupounCode", coupounCodeSchema);
