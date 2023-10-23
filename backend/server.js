const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.vp2kugo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB).then(() => console.log("DB connected successfully!"));

cloudinary.config({ 
  cloud_name: 'dleogo48u', 
  api_key: '643894985824757', 
  api_secret: '4D_VmBL5uCMqVlj_eL2w5pUVUKs',
});

const server = app.listen(process.env.PORT, () =>
  console.log(
    `server started at port ${process.env.PORT} and in ${process.env.NODE_ENV} mode`
  )
);

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Server is shutting down for unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
