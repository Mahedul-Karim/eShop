const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { handleError } = require("./controller/errorController");

const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const eventRoutes = require("./routes/eventRoutes");
const couponRoutes = require("./routes/couponRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const convRoutes = require("./routes/conversationRoutes");
const withdrawRoutes = require("./routes/withdrawRoutes");

const app = express();
// Product.insertMany(data);
dotenv.config({ path: "./config.env" });

app.use(cors());
app.options("*", cors());
app.use(express.json({ extended: true, limit: "50mb"  }));
app.use(express.urlencoded({ extended: true, limit: "50mb"  }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/shop", shopRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/conversation", convRoutes);
app.use("/api/v1/withdraw", withdrawRoutes);

app.use(handleError);

module.exports = app;
