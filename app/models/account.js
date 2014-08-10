'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

function Account(obj){
  this.name           = obj.name;
  this.color          = obj.color;
  this.pin            = obj.pin;
  this.photo          = obj.photo;
  this.balance        = parseFloat(obj.balance);
  this.accountType    = obj.accountType;
  this.openDate       = new Date(obj.openDate);
  this.transactions   = [];
}

Object.defineProperty(Account, 'collection', {
  get: function(){return global.mongodb.collection('accounts');}
});


Account.prototype.newTransaction = function(trans, cb){
  var fee = 0;
  var amount = parseFloat(trans.amount);
  if(trans.type === 'withdraw'){
   this.balance -= amount;
    if(this.balance < 0){
     fee = 50;
     this.balance -= fee;
    }
  }
  else {
   this.balance += amount;
  }

  var transaction = {type: trans.type, amount: trans.amount, date: new Date(), id: this.transactions.length+1, fee: fee};

  this.transactions.push(transaction);

  Account.collection.update({_id:this._id}, {$push:{transactions:transaction}}, cb);

};

Account.create = function(account, cb){
  var newAccount  = account;
  Account.collection.save(newAccount, cb);
};


Account.display = function(query, cb){
  var id = Mongo.ObjectID(query);
  Account.collection.findOne({_id: id}, function(err, obj){
    var account = changeProto(obj);
    sortDateAscending(account.transactions);
    cb(account);
  });
};


Account.findById = function(query, cb){
  var id = Mongo.ObjectID(query);
  Account.collection.findOne({_id: id}, function(err, obj){
    var account = changeProto(obj);
    cb(account);
  });
};



// HELPER FUNCTIONS
function changeProto(obj){
  return _.create(Account.prototype, obj);
}

function sortDateAscending(arr){
  arr.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
}



module.exports = Account; 













