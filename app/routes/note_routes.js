module.exports = function(app, db) {
  //post 
  app.post('/notes', (req, res) => {
    console.log(req.body)
    res.send('Post request made!')
  });
};