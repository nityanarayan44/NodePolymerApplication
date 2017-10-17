/*
@initialy Written: March 2016
@last modified: May 2017
@Author: Ashutosh Mishra
@Desc: Simple Node Server to serve some REST API.
*/
/* setting the port for the express nodejs server. */
	var port 		= process.env.PORT || 10000; // set the port

/* Express nodejs framework module */
	var express 	= require('express');
	var app 		= express();

/* Extra Payloads Modules */
	var multer 		= require("multer");
	var bodyParser 	= require('body-parser');
	var cookieParser= require('cookie-parser');
	var session 	= require('express-session');

/*To call an REST API [in-case]*/
	var request 	= require('request');

/*To recieve a form thats can contains data, file etc.*/
	var formidable	= require('formidable');

/* Importing basic modules */
	var path 		= require('path');
	var fs 			= require('fs');
	var util 		= require('util');

/* Own written modules-library */
	var coreLogics 	= require('./lib/coreLogics.js');
	var form 		= require('./lib/formProcessing.js');
	var teamjsondata= require('./lib/teamjsondata.js');
	var todayInHistory= require('./lib/todayInHistory.js');
	
/* Data */
	var empdata = require('./data/empdata.js');

/* Setting up static directory for static file serving. */
	//Whenever anyone acces this server url(base url) then these public file will be served directly.
	app.use(bodyParser.json());
	app.use(express.static('public'));

/* Starting server on defined PORT*/
	app.listen(port);
	console.log("\n[1] - Server listening on port " + port + "... [http://localhost:"+port+"/]");

/*------------------------
	Logging Requested route url.
--------------------------*/
	app.use(function(req, res, next){ console.log(" Requested URL ["+ req.ip +"]>>>", req.url); next(); });

/*-----------------------------
	Defining different Routes
-------------------------------*/
	//POST
	app.post('/', function(req, res, next){ console.log(res); res.status(200).send("All Okay");});

	/*GET Method*/
	app.get("/api/v1/polling", function(req, res, next){ console.log(req); res.status(200).send('done'); });

	/*GET Method: Sending json list of Quotes */
	app.get("/api/v1/getHomeScreenContent", todayInHistory.getHistory);

	/* File Upload Section. [Full-working Code]*/
	app.post('/api/v1/upload-form', form.upload);

	//to Get the team list.
	app.get("/api/v1/getTeam", teamjsondata.getTeam );

/*
	----------------------------------------------------------------------------------------------------------------------------
	 Routes for data saving to Mongo.
	---------------------------------------------------------------------------------------------------------------------------
*/
	//Recieving test data and saving it to mongo DB.
	app.post('/nng/v1/core/sendTestData', function(req, res, next){res.status(200).send("sendTestData");});
	
	
/*
	----------------------------------------------------------------------------------------------------------------------------
	Callback Functions for Routes
	---------------------------------------------------------------------------------------------------------------------------
*/

//=[Building SAMPLE JSON DATA]=====================================================================================
	function sendJSONData(req, res, next){
		//making data for an API request
		var arrData = [{"Type":"Sample"}];//Finally sending after stringify json data.
		res.status(200).send(JSON.stringify(arrData));
	}
