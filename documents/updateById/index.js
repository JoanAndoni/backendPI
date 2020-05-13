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
    var serviciosId = req.params.id;//Creamos una variable que guarde los parámetros del body
    var update = req.body;//Creamos una variable que guarde los parámetros del body
    await Sale.findByIdAndUpdate(serviciosId,update,(error, docs) => {//Hacemos la llamada a la base de datos por medio del la función de findById
        if (error) {
            context.log('Error running query');
            context.res = { status: 500}
            return context.done();
          }
          else{
            if(!docs) {
                context.log('El servicio no ha sido actualizado');
                context.res = { status: 404, body: res.stack }
                return context.done();
            }else {
                context.res = {
                    status: 200,
                    body: docs
                };
            }
          }

    });
    context.done();     
  
  };