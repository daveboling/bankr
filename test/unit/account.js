/* global describe, it, before, beforeEach */
'use strict';


var expect = require('chai').expect;
var Account  = require('../../app/models/account');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var cp = require('child_process');
var db = 'account-test';

describe('Account', function(){

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
    it('should create a new transaction with properties', function(){
      var a1 = new Account({name:'Bob Smith', color:'red', pin:'3333', photo: 'bob.jpg', balance:'950.50', accountType: 'savings'});

      expect(a1.name).to.equal('Bob Smith');
      expect(a1.color).to.equal('red');
      expect(a1.pin).to.equal('3333');
      expect(a1.photo).to.equal('bob.jpg');
      expect(a1.balance).to.equal(950.5);
      expect(a1.accountType).to.equal('savings');
      expect(a1.openDate).to.be.instanceof(Date);
    });
  });

  describe('.create', function(){
    it('should create a new account entry in the database', function(done){
      var a1 = new Account({name:'Bob Smith', color:'red', pin:'3333', photo: 'bob.jpg', balance:'950', accountType: 'savings', openDate: '5/14/17'});
        a1.transactions.push({type: 'deposit', amount: '1000'});
        Account.create(a1, function(err, a){
          expect(a._id).to.be.instanceof(Mongo.ObjectID);
          expect(a.transactions.length).to.equal(1);
          done();
        });
    });
  });

  describe('.display', function(){
    it('should display transfers and transactions to the screen', function(done){
      Account.display('53d01ddf4fbbd6de0b530020', function(account){
        expect(account._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });

    it('should display transfers and tranactions in ascending order', function(done){
      Account.display('53d01ddf4fbbd6de0b530020', function(account){
        expect(account.transactions[0].date).to.be.above(account.transactions[1].date);
        done();
      });
    });
  });

  describe('#newTransaction', function(){
    it('should add a new transaction to an account', function(done){
      Account.findById('53d01ddf4fbbd6de0b530020', function(account){
         account.newTransaction({type: 'withdraw', amount: '100'}, function(){
            expect(account.transactions.length).to.equal(4);
            expect(account.transactions[3].id).to.equal(4);
            done();
         });
      });
    });
    it('should charge overdraft fee', function(done){
      Account.findById('53d01ddf4fbbd6de0b530020', function(account){
         account.newTransaction({type: 'withdraw', amount: '901'}, function(){
           expect(account.balance).to.equal(-51);
           expect(account.transactions[3].fee).to.equal(50);
           done();
         });
      });
    });
    it('should deposit money', function(done){
      Account.findById('53d01ddf4fbbd6de0b530021', function(account){
         account.newTransaction({type: 'deposit', amount: '600'}, function(){
           expect(account.balance).to.equal(1600);
           done();
         });
      });
    });
  });












});
