const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    groupTitle:{
        type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    participentId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Shop'
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);