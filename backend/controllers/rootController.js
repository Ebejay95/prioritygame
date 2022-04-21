// 404 - Not found
exports.get404 = (req, res, next) => {
  res.status(404)

  // respond json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain text
  res.type('txt').send('Not found');

  // Html is not supported. This express app uses no template engine.
};
  