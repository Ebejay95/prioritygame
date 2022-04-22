// import mongoose as ODM for mongoDB
const mongoose = require('mongoose')

// provide authentication for mongoDB service
const mongoDB = 'mongodb+srv://hp24hoffentlichklapptdas:hp24hoffentlichklapptdas@prioritygame.8ujod.mongodb.net/test'

// establish database connection
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('MongoDB connected!')
})

const db = mongoose.connection

// catch errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db