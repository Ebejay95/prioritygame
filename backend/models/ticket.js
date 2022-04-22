/****************************************/
/*  Ticket Model                        */
/****************************************/


// setup ticket shema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  impact: {
    type: Number,
    required: false
  }
})

// export
module.exports = mongoose.model('Ticket', ticketSchema)