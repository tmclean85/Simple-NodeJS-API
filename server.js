
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const db = require('./config/db');

// init bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if(err) {
    return console.log(err);
  };
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('Mic check one two, port ' + port);
  });
});

// passed empty obj pending db creation
