const multer = require("multer");

const storage = multer.memoryStorage()

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `product-${Date.now()}.${ext}`);
//   },
// });

exports.upload = multer({ storage });
