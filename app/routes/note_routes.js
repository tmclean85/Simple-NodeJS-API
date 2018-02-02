
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //delete note based on id
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('notes').remove(details, (err, item) => {
      if(err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Quote ' + id + ' deleted!');
      }
    });
  });

  //get post json by id
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  //post note to collection
  app.post('/notes', (req, res) => {
    const note = {
      speaker: req.body.speaker,
      quote: req.body.quote,
      date: req.body.date
    };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};