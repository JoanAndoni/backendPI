// FILE: modeSchema.js
/**
 * Model: Sale
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Sale Schema.
const documents = new mongoose.Schema({
  url: {
    type: String, 
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  users: [],
  paymentAmount:{
    type: Number, 
    requiered: true
  },
  paymentDone:{
    type: Boolean,
    required: true
  }
});
// Export the model.
module.exports = mongoose.model('documents', documents);