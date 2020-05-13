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
  users: [{
    id:{
      type: String,
      required: true
    },
    status:{
      type: Boolean, 
      required: true
    },
    token:{
      type: String, 
      required: true
    },
    charge:{
      type: Number,
      required: true
    }
  }],
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