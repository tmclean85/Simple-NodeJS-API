
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const db = require('./config/db');

// init bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// deal with CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT");
  next();
});

// le server
MongoClient.connect(db.url, (err, database) => {
  if(err) {
    return console.log(err)
  };
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('Mic check one two, port ' + port);
  });
});
