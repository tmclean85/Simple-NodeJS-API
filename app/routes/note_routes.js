
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //update note by id
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    const note = {
      speaker: req.body.speaker,
      quote: req.body.quote,
      date: req.body.date
    };
    db.collection('notes').update(details, note, (err, result) => {
      if(err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Quote ' + id + ' has been updated: ' + note);
      }
    });
  });

  //delete note by id
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

  //get note by id
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(JSON.stringify(item));
      }
    });
  });

  //get notes by speaker, else get all notes
  app.get('/notes', (req, res) => {
    const speaker = req.query.speaker;
    const details = { 'speaker': speaker };
    if(speaker) {
      db.collection('notes').findOne(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send(JSON.stringify(item));
        }
      });
    } else {
      db.collection('notes').find({}).toArray((err, result) => {
        if(err) {
          res.send({'error':err});
        } else {
          res.send(JSON.stringify(result));
        }
      });
    }

  });


  //post note to collection
  app.post('/notes', (req, res) => {
    const note = {
      speaker: req.body.speaker,
      quote: req.body.quote,
      date: req.body.date
    };
    console.log(req.body);
    db.collection('notes').insertOne(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};