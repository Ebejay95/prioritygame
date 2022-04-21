// Provide necessary models
const Ticket = require('./../models/ticket')

// Find all tickets of the ticket collection
exports.getAllTickets = (req, res, next) => {
  Ticket.find()
    .then(tickets => {
      res.json(tickets);
    })
    .catch(err => {
      console.log(err);
    });
};

// Find all tickets of the ticket collection
exports.postAddTicket = (req, res, next) => {
    console.log(req.body)
  const title = req.body.title;
  const desc = req.body.desc;
  const impact = (req.body.impact) ? req.body.impact : null
  
  const ticket = new Ticket({
    title: title,
    desc: desc,
    impact: impact,
  });
  ticket
    .save()
    .catch(err => {
      console.log(err);
    });
};