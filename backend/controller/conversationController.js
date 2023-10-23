const Conversation = require("../model/conversationModel");
const Message = require("../model/messageModel");
const AppError = require("../model/errorModel");
const catchAsync = require("../util/catchAsync");
const cloudinary = require("cloudinary");

exports.createConv = catchAsync(async (req, res, next) => {
  const { groupTitle, userId, participentId } = req.body;

  const existingConv = await Conversation.findOne({ groupTitle });

  if (existingConv) {
    return res.status(200).json({
      status: "success",
      conversation: existingConv,
    });
  }

  const newConv = await Conversation.create({
    members: [userId, participentId],
    groupTitle,
  });

  res.status(200).json({
    status: "success",
    conversation: newConv,
  });
});

exports.createMessage = catchAsync(async (req, res, next) => {
  

  const { sender, text, conversationId } = req.body;

 

  if (req.file) {
    req.body.images = {
      public_id: "fdf",
      url: `${req.protocol}://${req.get("host")}/${
        req.file.destination.split("/")[1]
      }/${req.file.filename}`,
    };
  }

  const messages = await Message.create({
    sender,
    text,
    conversationId,
    images: req.body.images,
  });

  res.status(201).json({
    status: "success",
    messages,
  });
});

//seller conversation
exports.sellerConv = catchAsync(async (req, res, next) => {
  const sellerConversation = await Conversation.find({
    members: {
      $in: [req.params.id],
    },
  }).sort({ updatedAt: -1, createdAt: -1 });

  if (!sellerConversation || sellerConversation.length === 0) {
    return next(new AppError("No conversation yet"));
  }

  res.status(200).json({
    status: "success",
    conversation: sellerConversation,
  });
});

exports.updateLastMessage = catchAsync(async (req, res, next) => {
  const { lastMessage, lastMessageId } = req.body;

  const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
    lastMessage,
    lastMessageId,
  });

  res.status(201).json({
    status: "success",
    conversation,
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find({ conversationId: req.params.id });

  res.status(200).json({
    status: "success",
    messages,
  });
});
