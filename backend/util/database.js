const mongoose = require('mongoose');

// Provide Authentication
var mongoDB = 'mongodb+srv://hp24hoffentlichklapptdas:hp24hoffentlichklapptdas@prioritygame.8ujod.mongodb.net/test';

// Provide Connection
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('MongoDB connected!');
});
var db = mongoose.connection;

// catch error for devevlopment
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;