
require('colors')
require('sugar');

var server = require('../');
var assert = require('assert');
var request = require('request');

var subject = 'Test'.cyan+' → '.grey+ 'Domains (http)'.yellow + ': '.grey;

describe(subject + 'Setup Domain with a String or a URL Object or Undefined', function(){	
	it('should create an app and setup the domain with a `string` listening on http://localhost:9006/'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('http://localhost:9006/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from localhost:9006');
		});
		
		request.get('http://localhost:9006/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9006');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			
			done();
		});
	});
	
	it('should create an app and setup the domain with a `string` listening on http://localhost:9007/'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain({ 
			protocol: 'http:',
			hostname: 'localhost',
			port: '9007'
		});
		app.start();
		
		app.get('/', function($){
			$.end('hello from localhost:9007');
		});
		
		request.get('http://localhost:9007/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9007');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			
			done();
		});
	});
	
	it('should create an app and setup the domain with an undefined domain and return the message "Cannot read property \'hostname\' of undefined"'.grey
	, function(done){
		var app = new server();
		assert.equal(app.domain(undefined), 'Error Domain was not specified.');
		assert.equal(app.start(), 'Error can\'t start app without specifing a Domain.');
		done();
	});
	
	it('should create an app and setup the domain with an Integer domain and return the message "Error Domain must be a URL String or an URL Object."'.grey
	, function(done){
		var app = new server();
		assert.equal(app.domain(9000), 'Error Domain must be a URL String or an URL Object.');
		assert.equal(app.start(), 'Error can\'t start app without specifing a Domain.');
		done();
	});
});

describe(subject + 'Create Multiple Apps on Different HTTP Ports', function(){	
	it('should create server Instance listening on http://localhost:9001/'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('http://localhost:9001/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from localhost:9001');
		});
		
		request.get('http://localhost:9001/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9001');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			
			done();
		});
	});
	
	it('should create server Instance listening on http://localhost:9002/'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('http://localhost:9002/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from localhost:9002');
		});
		
		request.get('http://localhost:9002/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from localhost:9002');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	})
});

describe(subject + 'Create Multiple Apps on the same HTTP port (9003) with Different Domains', function(){	
	it('should create server Instance listening on http://test.local.com:9003/'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('http://test.local.com:9003/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from http://test.local.com:9003/');
		});
		
		request.get('http://test.local.com:9003/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from http://test.local.com:9003/');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	});
	
	it('should create server Instance listening on http://test2.local.com:9003/'.grey
	, function(done){
		var app = new server({debug: false});
		app.domain('http://test2.local.com:9003/');
		app.start();
		
		app.get('/', function($){
			$.end('hello from http://test2.local.com:9003/');
		});
		
		request.get('http://test2.local.com:9003/', function(error, response, body){
			if(error) throw error;
			assert.equal(body, 'hello from http://test2.local.com:9003/');
			assert.equal(response.headers['content-type'], 'text/plain');
			assert.equal(response.statusCode, 200);
			done();
		});
	})
});