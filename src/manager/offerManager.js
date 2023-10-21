const Offer = require ('../models/Offer');

exports.create = (offerData) => Offer.create(offerData);

exports.getAll = ()=> Offer.find();

exports.getOne = (offerId)=> Offer.findById(offerId);
