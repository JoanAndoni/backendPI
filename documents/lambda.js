const mongoose = require('mongoose');
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

addDocument = function (newDoc, callback){

  if (newDoc == ''){
    // No info
  }
  else {
    // return Document.create(newDoc)
  }
}

getDocumentById = function(DocID){
  if (DocID == ''){
    // No info
  }
  else {
    // return Document.create(newDoc)
    return Document.findById(DocID)
  }
}

const handler = function(event, context){

  console.log("EVENT: \n" + JSON.stringify(event, null, 2))

  const SaveDoc = addDocument(event[0])
  const DocData = getDocumentById(event[1])

  console.log("DocData", DocData)

  return {
    SavedDoc: SaveDoc,
    Document: DocData
  }

}  

let event = [
  // {
  //   'hash': 'sjajsdhajj1232',
  //   'url': 'algo.com',
  //   'users': [],
  //   'paymentAmount': 200, 
  //   'paymentDone': false
  // },
  '',
  '5ea89dfe61dd84530ec78206'
]

handler(event)

module.exports = {handler}