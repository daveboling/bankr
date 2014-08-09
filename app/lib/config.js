'use strict';

module.exports = function(app){
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/../views');

  console.log('Express Configured');
};