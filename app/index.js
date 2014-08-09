'use strict';

var express = require('express');
var app 	= express();
var db 	    = process.env.DB;
var port 	= process.env.PORT;

require('./lib/config')(app);
require('./lib/pipeline')(app, express);
require('./lib/mongodb')(db);


app.listen(port, function(){
	console.log('Express is listening on port', port);
});