'use strict';

var Account = require('../models/account');
var Transfer = require('../models/transfer');
var moment = require('moment');

exports.init = function(req, res){
	res.render('account/init');
};

exports.create = function(req, res){
	var newAccount = new Account(req.body);
	Account.create(newAccount, function(){
		res.redirect('/account');
	});
};

exports.index = function(req, res){
	Account.all(function(accounts){
		res.render('account/index', {accounts : accounts, moment: moment});
	});
};