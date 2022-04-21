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

// Find a ticket by id
exports.getTicket = (req, res, next) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      res.json(ticket);
    })
    .catch(err => {
      console.log(err);
    });
};

// Add a ticket to tickets collection
exports.postAddTicket = (req, res, next) => {
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

// Edit a ticket to tickets collection
exports.postEditTicket = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const desc = req.body.desc;
  const impact = (req.body.impact) ? req.body.impact : null
  
  const ticket = new Ticket({
    title: title,
    desc: desc,
    impact: impact,
  });

  Ticket
    .updateOne({sku: id}, {
      id: id,
      title: title,
      desc: desc,
      impact: impact
    })
    .catch(err => {
      console.log(err);
    });
};