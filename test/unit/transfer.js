/* global describe, it, before, beforeEach */
'use strict';


var expect = require('chai').expect;
var Account  = require('../../app/models/account');
var Transfer = require('../../app/models/transfer');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var cp = require('child_process');
var db = 'account-test';

describe('Transfer', function(){

  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/freshdb.sh', [db], {cwd:__dirname + '/../scripts'}, function(err){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new transfer object', function(){
      var t1 = new Transfer({from: 'Bob Smith', to: 'Sara Smith', amount: '100', fromId: '53d01ddf4fbbd6de0b530020', toId: '53d01ddf4fbbd6de0b530021'});
      expect(t1).to.be.instanceof(Transfer);
      expect(t1.from).to.equal('Bob Smith');
      expect(t1.fromId).to.equal('53d01ddf4fbbd6de0b530020');
      expect(t1.to).to.equal('Sara Smith');
      expect(t1.toId).to.equal('53d01ddf4fbbd6de0b530021');
      expect(t1.amount).to.equal(100);
    });
  });

  describe('.findAll', function(){
    it('should find all transfers for a given accountee', function(done){
      Transfer.findAll('53d01ddf4fbbd6de0b530020', function(transfers){
        expect(transfers.length).to.equal(2); 
        done();
      });
    });
  });

  describe('.create', function(){
    it('should transfer funds from one account to another', function(done){
      Account.findById('53d01ddf4fbbd6de0b530020', function(account){
        var transfer = new Transfer({from:'Bob Smith', to: 'Sara Smith', fromId:account._id ,toId:'53d01ddf4fbbd6de0b530021', amount:50}); 
          transfer.create(transfer, function(){
             expect(transfer._id).to.be.instanceof(Mongo.ObjectID);
             done();
          });
       });
    });
  });








});
