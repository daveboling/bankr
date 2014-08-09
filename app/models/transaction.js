'use strict';

var Mongo = require('mongodb');

function Transaction(obj){
	this.name           = obj.name;
	this.color		    = obj.color;
	this.pin 	   	    = obj.pin;
	this.photo	   	    = obj.photo;
	this.openingDeposit = obj.openingDeposit;
	this.accountType	= obj.accountType;
}


//Getter for database collection
Object.defineProperty(Transaction, 'collection', {
  get: function(){return global.mongodb.collection('transactions');}
});