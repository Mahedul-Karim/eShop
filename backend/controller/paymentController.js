const catchAsync = require("../util/catchAsync");

const Stripe = require("stripe")

const x="sk_test_51NIsJcJslDAWGDHdA22nu6RQsgtIMHzngR0xqMEZcALpMmdN9tojjXYJi8B3VkoKsZoEouQgmsMMoksaDkphsg1400F2xwIxuv"
const stripe=Stripe(x)

exports.getPayment = catchAsync(async (req, res, next) => {
 
  const payments = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "A dummy company",
    },
  });
  
  res.status(201).json({
    status: "success",
    client_secret: payments.client_secret,
  });
});

exports.getApiKey = catchAsync(async (req, res, next) => {
  res.status(200).json({
    public: process.env.STRIPE_PUBLIC_KEY,
  });
});
