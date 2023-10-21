const Offer = require ('../models/Offer');

exports.create = (offerData) => Offer.create(offerData);

exports.getAll = ()=> Offer.find();

exports.getOne = (offerId)=> Offer.findById(offerId);

exports.update = (offerId, offerData)=> Offer.findByIdAndUpdate(offerId, offerData);


exports.delete = (offerId)=> Offer.findByIdAndDelete(offerId);