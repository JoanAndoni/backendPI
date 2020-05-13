module.exports = async function(context, req) {

  const mongoose = require('mongoose');
  const DATABASE = process.env.MongodbAtlas;
  // Connect to our Database and handle any bad connections
  mongoose.connect(DATABASE);
  mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
  mongoose.connection.on('error', (err) => {
      context.log('Failed to connect');
      context.res = { status: 500, body: res.stack }
      return context.done();
  });
  context.log('Connected');
  require('./modelSale');
  const Sale = mongoose.model('documents');
  require('./modelUser');
  const User = mongoose.model('User');
  const serviciosId = req.body.id
  await User.findById(serviciosId,(error, docs) => {//Hacemos la llamada a la base de datos por medio del la función de findById
      if (error) {
          context.log('Error running query');
          context.res = { status: 500, body: res.stack }
          return context.done();
        }
        Sale.find({'_id': { $in:docs.documents }}, function(err, docs){
          if (err) {
            context.log('Error running query');
            context.res = { status: 500, body: res.stack }
            return context.done();
          }
            context.res = {
              status: 200,
              body: docs
          };
      });

});
  context.done();     

};