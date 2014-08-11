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

exports.overview = function(req, res){
	Account.display(req.params.id, function(account){
		Transfer.findAll(account._id, function(transfers){
			console.log(account, transfers);
			res.render('account/overview', {account: account, transfers: transfers, moment: moment});
		});
	});
};

exports.tranInit = function(req, res){
	Account.findById(req.params.id, function(account){
		console.log(account);
		res.render('account/tran-init', {account: account});
	});
};

exports.tranCreate = function(req, res){
	Account.findById(req.params.id, function(account){
		console.log(account);
		account.newTransaction(req.body, function(){
			res.redirect('/account/' + req.params.id);
		});
	});
};