/****************************************/
/*  General Controller                  */
/****************************************/
// HTML-Files via a template engine are not supported in this app.
// Rendering is handled by a separate angular app


// GET - Root / Any invalid Route 
exports.get404 = (req, res, next) => {

  res.status(404)

  // respond json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' })
    return
  }

  // default to plain text
  res.type('txt').send('Not found')

}
  