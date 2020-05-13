// FILE: modeSchema.js
/**
 * Model: Sale
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Sale Schema.
const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    documents: [],
    documentsInvitation: []
  });
// Export the model.
module.exports = mongoose.model('User', UserSchema);