const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, },
    damages: { type: String, required: true },
    image: { type: String, required: true, },
    description: { type: String, required: true,},
    production: { type: Number, required: true },
    exploitation: { type: Number, required: true,  },
    price: { type: Number, required: true },
    buyingList: {
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    owner: {
        type:mongoose.Types.ObjectId,
        ref:'User',

    }
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;