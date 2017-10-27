/*
@initialy Written: March 2016
@last modified: May 2017, October 2017
@Author: Ashutosh Mishra
@Desc: Simple Node Server to serve some REST API.
*/
/* setting the port for the express nodejs server. */
	var port 		= process.env.PORT || 5000; // set the port

/* Express nodejs framework module */
	var express 	= require('express');
	var app 	= express();

/* Extra Payloads Modules */
	var multer 	= require("multer");
	var bodyParser 	= require('body-parser');
	var cookieParser= require('cookie-parser');
	var session 	= require('express-session');

/*To call an REST API [in-case]*/
	var request 	= require('request');

/*To recieve a form thats can contains data, file etc.*/
	var formidable	= require('formidable');

/* Importing basic modules */
	var path 	= require('path');
	var fs 		= require('fs');
	var util 	= require('util');
/* MongoDB Driver */
	var MongoClient = require('mongodb').MongoClient;
	var assert 	= require('assert');
	var url 	= 'mongodb://localhost:27017/test';
/* Own written modules-library */
	var coreLogics 	= require('./lib/coreLogics.js');
	var form 	= require('./lib/formProcessing.js');
	var teamjsondata= require('./lib/teamjsondata.js');
	var todayInHistory= require('./lib/todayInHistory.js');
	
/* (json file data) Local stored Data */
	var empdata 	= require('./data/empdata.js');

/* Setting up static directory for static file serving. */
	//Whenever anyone acces this server url(base url) then these public file will be served directly.
	app.use(bodyParser.json());
	app.use(express.static('public'));

/* Starting server on defined PORT*/
	app.listen(port);
	console.log("\n[1] - Server listening on port " + port + "... [http://127.0.0.1:"+port+"/] \n Press Ctrl+C to Quit the server. \n");

/*------------------------
	Logging Requested route url.
--------------------------*/
	app.use(function(req, res, next){ console.log(" Requested URL ["+ req.ip +"]>>>", req.url); next(); });

	/*-------------------------------
	 * General perpose Routes
	 *-------------------------------
	 **/
	//POST
	app.post('/', function(req, res, next){
		console.log(req);
		saveData(req.body);
		res.header('Access-Control-Allow-Origin', '*');
		res.status(200).send('Recieved: '+ JSON.stringify(req.body) );
	});

	/*GET Method*/
	app.get("/api/v1/polling", function(req, res, next){ console.log(req); res.status(200).send('done'); });

	/*GET Method: Sending json list of Quotes */
	app.get("/api/v1/getHomeScreenContent", todayInHistory.getHistory);

	/* File Upload Section. [Full-working Code]*/
	app.post('/api/v1/upload-form', form.upload);

	//to Get the team list.
	app.get("/api/v1/getTeam", teamjsondata.getTeam );

	//Recieving test data and saving it to mongo DB.
	app.post('/nng/v1/core/sendTestData', function(req, res, next){res.status(200).send("sendTestData");});
	
	//API to get data for Report Generation
	app.post('/nng/core/api/v1/getTestData/', function(req, res, next){res.status(200).send("Called getTestData");});
	
	/*
	 *----------------------------------------------------------------------------------------------------------------------------
	 *Callback Functions for Routes
	 *---------------------------------------------------------------------------------------------------------------------------
	 **/
	function sendJSONData(req, res, next){
		//making data for an API request
		var arrData = [{"Type":"Sample"}];//Finally sending after stringify json data.
		res.status(200).send(JSON.stringify(arrData));
	}

	/*
	 *----------------------------------------------------------------------------------------------------------------------------
	 * Callback functions for data saving to Mongo.
	 *---------------------------------------------------------------------------------------------------------------------------
	 **/
	
	function connectToMongo(){
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("MongoDB>>> Connected to DB server.");
			db.close();
		});
	}

	function createCollection(collectionName){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			db.createCollection(collectionName, function(err, res) {
				if (err) throw err;
				console.log("MongoDB>>> Collection created Successfully !!!");
				db.close();
			});
		}); 
	}

	function saveData(dataObject){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			db.collection("customers").insertOne(dataObject, function(err, res) {
			  if (err) throw err;
			  console.log("MongoDB>>> Record inserted successfully !!!");
			  db.close();
			});
		});
	}