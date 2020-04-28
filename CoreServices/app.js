// Make the comunication with a server to create petitions
const express = require('express');
// Make the paths for the paths to create the petitions
const path = require('path');
// Parses the information in the body of petitions
const bodyParser = require('body-parser');
// Cross-Origin Resource Sharing needed for express to get headers
const cors = require('cors');
// Strategy for authenticating with a JSON Web Token.
const passport = require('passport');
// MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');
// Configuration of the database
const config = require('./config/database');

// Connect to the database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Connect to the database and log out if it was successful
mongoose.connection.on('connected', () => {
  console.log('Connected to the database in atlas');
})

// Logout if the connect was failed
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
})

// Initialize Express
const app = express();

// Create the routing for the petitions in users URL
const users = require('./routes/users');

// Set the port that you want to start the service app
const port = 3000;

// CORS Middleware added to express
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// Passport strategy for authenticating with a JSON Web Token.
app.use(passport.initialize());
app.use(passport.session());

// Get the code of the settings for the passport
require('./config/passport')(passport);

// Use users as the domain to make the petitions
app.use('/users', users);

// Index Route / show as invalid end point
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server on the port setted
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

// Documents model
function DocumentModel(){

  const DocumentSchema = mongoose.Schema({
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

  const Document = module.exports = mongoose.model('Document', DocumentSchema);

  module.exports.getDocumentById = function (id, callback) {
    Document.findById(id, callback);
  }

  module.exports.addDocument = function (newDoc, callback){
    newDoc.save(callback)
  }

  const handler = async event =>{
    await validateData(event)
    const DocData = getDocumentById(event[0])
    const SaveDoc = addDocument(event[1])
    return {
      Documet: DocData, 
      SavedDoc = SaveDoc,
    }
  }  
  
  module.exports = {handler}
}