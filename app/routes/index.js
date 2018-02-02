const noteRoutes = require('./note_routes');

//Routes must be wrapped in func which takes Express instance and db as args
module.exports = function(app, db) {
  noteRoutes(app, db);
};