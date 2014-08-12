'use strict';

var Account = require('../models/account');
var Transfer = require('../models/transfer');
var helper = require('../helpers/helper');
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
			res.render('account/overview', {account: account, transfers: transfers, moment: moment});
		});
	});
};

exports.tranInit = function(req, res){
	Account.findById(req.params.id, function(account){
		res.render('account/tran-init', {account: account});
	});
};

exports.tranCreate = function(req, res){
	Account.findById(req.params.id, function(account){
		account.sourcePin = req.body.sourcePin;
		account.newTransaction(req.body, function(){
			res.redirect('/account/' + req.params.id);
		});
	});
};

exports.xferInit = function(req, res){
	Account.all(function(destinations){
		Account.findById(req.params.id, function(account){
			destinations = helper.remove(destinations, req.params.id);
			res.render('account/xfer-init', {destinations: destinations, account: account});
		});
	});
};

exports.xferCreate = function(req, res){
	Account.findById(req.params.id, function(account){
		Account.findById(req.body.toId, function(to){
				req.body.from = account.name;
				req.body.to = to.name;
				var transfer = new Transfer(req.body);
					transfer.balance = account.balance;
					transfer.sourcePin = account.pin;
					transfer.pin = req.body.pin;

				transfer.create(transfer, function(){
					res.redirect('/account/' + req.params.id);
				});
		});
	});
};