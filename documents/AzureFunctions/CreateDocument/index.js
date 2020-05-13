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
    require('./modelSale');
    const Sale = mongoose.model('documents');
    require('./modelUser');
    const User = mongoose.model('User');
    if (req.body) { // Simple authentication for the purpose of demo.
        // Build the data we need.
        const url = req.body.url;
        const hash = req.body.hash;
        const users = req.body.users;
        const paymentAmount = req.body.paymentAmount;
        const paymentDone = req.body.paymentDone;
        const finalData = {
            url: url,
            hash: hash,
            users: users,
            paymentAmount: paymentAmount,
            paymentDone: paymentDone,
        }
        const sale = await (new Sale(finalData))
        .save();
        await User.updateMany(   
            { _id: { $in: users } },
            { $push: { documents : sale._id }},{ upsert: true, new: true });
            
        context.res = {
            status: 200,
            body: sale._id
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    
    context.done();

  
  };