// Provide necessary models
const Ticket = require('./../models/ticket')
const ObjectId = require('mongodb').ObjectId

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
  Ticket.findById(req.params._id)
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
  const impact = (req.body.impact) ? req.body.impact : 0

  const ticket = new Ticket({
    title: title,
    desc: desc,
    impact: impact,
  });
  ticket
    .save()
    .then(
      () => {
        //provide updated tickets
        Ticket.find()
          .then(tickets => {
            res.json(tickets);
          })
          .catch(err => {
            console.log(err);
          });
      }
    )
    .catch(err => {
      console.log(err);
    });
};

// Edit a ticket to tickets collection
exports.postEditTicket = (req, res, next) => {
  const _id = req.body._id;
  const title = req.body.title;
  const desc = req.body.desc;
  const impact = (req.body.impact) ? req.body.impact : 0

  Ticket
    .updateOne({_id: new ObjectId(_id)}, {
      $set: {
        title: title,
        desc: desc,
        impact: impact
      }
    })
    .then(
      () => {
        //provide updated tickets
        Ticket.find()
          .then(tickets => {
            res.json(tickets);
          })
          .catch(err => {
            console.log(err);
          });
      }
    )
    .catch(err => {
      console.log(err);
    });
};

// Edit a ticket to tickets collection
exports.postDeleteTicket = (req, res, next) => {
  const _id = req.body._id;

  Ticket
    .deleteOne({_id: new ObjectId(_id)})
    .then(
      () => {
        //provide updated tickets
        Ticket.find()
          .then(tickets => {
            res.json(tickets);
          })
          .catch(err => {
            console.log(err);
          });
      }
    )
    .catch(err => {
      console.log(err);
    });
};

// Edit a tickets impact
exports.postChangeImpactTicket = (req, res, next) => {
  const _id = req.body._id;
  const impact = (req.body.impact) ? req.body.impact : 0

  Ticket
    .updateOne({_id: new ObjectId(_id)}, {
      $set: {
        impact: impact
      }
    })
    .then(
      () => {
        //provide updated tickets
        Ticket.find()
          .then(tickets => {
            res.json(tickets);
          })
          .catch(err => {
            console.log(err);
          });
      }
    )
    .catch(err => {
      console.log(err);
    });
};