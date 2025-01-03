const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your coupoun code name!"],
        unique: true,
    },
    value:{
        type: Number,
        required: true,
    },
    
    shop:{
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref:'Shop'
    },
    selectedProduct:{
     type: mongoose.Schema.Types.ObjectId,
     ref:'Product'
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("CoupounCode", coupounCodeSchema);