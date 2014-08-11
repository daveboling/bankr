'use strict';


var Mongo = require('mongodb');
var Account = require('./account');
var _ = require('lodash');

function Transfer(obj){
  this.from     = obj.from;
  this.to       = obj.to;
  this.fromId   = obj.fromId;
  this.toId     = obj.toId;
  this.amount   = parseInt(obj.amount);
}


Object.defineProperty(Transfer, 'collection', {
  get: function(){return global.mongodb.collection('transfers');}
});


Transfer.prototype.create = function(transfer, cb){
    var destination   = Mongo.ObjectID(transfer.toId);
    var source        = (typeof source === 'string') ? Mongo.ObjectID(transfer.fromId) : transfer.fromId;
    var fee           = 25;
    var newBalance = this.balance - (transfer.amount + fee);
     Account.collection.update({_id:destination}, {$inc:{balance:transfer.amount}}, function(err, result){
        Account.collection.update({_id:source}, {$set:{balance: newBalance}}, function(err, result){
          Transfer.collection.save(transfer, function(err, ob){
            cb();
        }); 
     });
  });
};

Transfer.findAll = function(query, cb){;
  Transfer.collection.find({$or: [{fromId: query.toString()}, {toId: query.toString()}]}).toArray(function(err, obj){
    var transfers = obj.map(function(o){
      return changeProto(o);
    });
    cb(transfers);
  });
};

module.exports = Transfer;

//Helper Functions
function changeProto(obj){
  return _.create(Transfer.prototype, obj);
}
