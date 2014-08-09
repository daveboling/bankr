'use strict';

var expect = require('chai');
var Transaction = require('../../app/models/transaction');
var dbConnect = require('../../app/lib/mongodb');
var cp = require('child_process');
var db = 'tran-test';



describe('Transaction', function(){

	before(function(done){
		dbConnect('banker', function(){
			done();
		});
	});

	beforeEach(function(done){
    	cp.execFile(__dirname + '/../scripts/freshdb.sh', [db], {cwd:__dirname + '/../scripts'}, function(err){
    		console.log(err);
    	  done();
    	});
	});

	describe('constructor', function(){
		it('should create a new transaction with properties', function(){

		});
	});









});
