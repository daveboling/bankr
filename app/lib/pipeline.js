'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var home = require('../controllers/home');
var account = require('../controllers/account');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));

  //Display homepage
  app.get('/', home.index);

  //Create an account
  //app.get('/account/new', account.init);
  //app.post('/account/new', account.create);
  
  //Display all accounts
  //app.get('/account', account.index);
  
  //Display individual account
  //app.get('/account/:id/', account.overview);
  
  //New Transaction
  //app.get('/account/:id/transaction'. account.tran-init);
  //app.post('account/:id/transaction', account.tran-create);
  
  //New Transfer
  //app.get('/account/:id/transfer', account.xfer-init);
  //app.port('/account/:id/transfer'. account.xfer-create);



  console.log('Pipeline Configured');
};