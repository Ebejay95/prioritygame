/****************************************/
/*  Ticket Controller                   */
/****************************************/
// HTML-Files via a template engine are not supported in this app.
// Rendering is handled by a separate angular app


// ObjectId for mongoDB indentification handling
const ObjectId = require('mongodb').ObjectId


// Provide necessary models
const Ticket = require('./../models/ticket')


// Provide validation tools for user inputs
const { body, validationResult } = require('express-validator');


// POST - add Ticket
exports.postAddTicket = (req, res, next) => {

  // retrieve data from request
  const title = req.body.title
  const desc = req.body.desc
  const impact = (req.body.impact) ? req.body.impact : 0

  // validate data
  body('title').isLength({ min: 2 })
  body('desc').isLength({ min: 10 })
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // provide data schema for mongoDB
  const ticket = new Ticket({
    title: title,
    desc: desc,
    impact: impact,
  })

  // save ticket and provide updated tickets
  ticket
    .save()
    .then(
      () => {
        Ticket.find()
          .then(tickets => { res.json(tickets) })
          .catch(err => { console.log(err) })
      }
    )
    .catch(err => { console.log(err) })

}


// POST - edit Ticket
exports.postEditTicket = (req, res, next) => {

  // retrieve data from request
  const _id = req.body._id
  const title = req.body.title
  const desc = req.body.desc
  const impact = (req.body.impact) ? req.body.impact : 0

  // update ticket and provide updated tickets
  Ticket
    .updateOne(
      {_id: new ObjectId(_id)}, 
      {
        $set: {
          title: title,
          desc: desc,
          impact: impact
        }
      }
    )
    .then(
      () => {
        Ticket.find()
          .then(tickets => { res.json(tickets) })
          .catch(err => { console.log(err) })
      }
    )
    .catch(err => { console.log(err) })

}


// POST - delete Ticket
exports.postDeleteTicket = (req, res, next) => {

  // retrieve data from request
  const _id = req.body._id

  // delete ticket and provide updated tickets
  Ticket
    .deleteOne({_id: new ObjectId(_id)})
    .then(
      () => {
        Ticket.find()
          .then(tickets => { res.json(tickets) })
          .catch(err => { console.log(err) })
      }
    )
    .catch(err => { console.log(err) })

}


// POST - change impact of Ticket
exports.postChangeImpactTicket = (req, res, next) => {

  // retrieve data from request
  const _id = req.body._id
  const impact = (req.body.impact) ? req.body.impact : 0

  // update ticket and provide updated tickets
  Ticket
    .updateOne({_id: new ObjectId(_id)}, {
      $set: {
        impact: impact
      }
    })
    .then(
      () => {
        Ticket.find()
          .then(tickets => { res.json(tickets) })
          .catch(err => { console.log(err) })
      }
    )
    .catch(err => { console.log(err) })

}


// GET - ticket by id
exports.getTicket = (req, res, next) => {

  // get ticket and provide it
  Ticket.findById(req.params._id)
    .then(ticket => { res.json(ticket) })
    .catch(err => { console.log(err) })

}


// GET - all tickets
exports.getAllTickets = (req, res, next) => {

  // get tickets and provide them
  Ticket.find()
    .then(tickets => { res.json(tickets) })
    .catch(err => { console.log(err) })

}