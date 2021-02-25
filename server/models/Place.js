const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: { type: {}, required: true },
  wishlist: { type: Boolean, required: true },
  typeOfPlace: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
    ref:"User"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Place", placeSchema);
