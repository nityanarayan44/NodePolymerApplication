/*
@Author: Ashutosh Mishra
@Desc: Simple Node Server to serve some REST API, and some file uploading to this server.
*/
var port 		= process.env.PORT || 10000; // set the port
var path 		= require('path');
var express 	= require('express');
var app 		= express();

/*To call an REST API [in-case]*/
var request 	= require('request');

/* Importing Modules */
var multer 		= require("multer");
var fs 			= require('fs');
var util 		= require('util');
var bodyParser 	= require('body-parser');
var cookieParser= require('cookie-parser');
var session 	= require('express-session');

/*Setting up [Old configuration style.]*/
	
	app.configure(function() {
	    //app.use(express.static(__dirname + '/app'));
	    //app.use(express.cookieParser());
	    //app.use(express.bodyParser());
	    //app.use(bodyParser.json());
	    app.use(express.bodyParser({keepExtensions:true, uploadDir:'./uploads'}));
	    //app.use(bodyParser.urlencoded({ extended: true }));
	    //app.use(express.methodOverride());
	});
	
	var jsonParser = bodyParser.json();
	var urlEncoder = bodyParser.urlencoded({ extended: true });
	app.use(express.static(__dirname + '/app'));

/* Starting server on PORT*/
	app.listen(port);
	console.log("\n[1] - Server listening on port " + port + "... [http://localhost:"+port+"/]");

/*
	--------------------- 
	Requested routes url.
	---------------------
*/
	app.use(function(req, res, next){
		console.log(" Requested URL ["+ req.ip +"]>>>", req.url);
		next(); /* Proceed to next job if any. [move execution point.]*/
	});
	
/* 
	--------------------------
	Defining different Routes 
	--------------------------
*/

	/*GET Method*/
	app.get("/", mainRoot);
	
	/*GET Method: Sending json list of Quotes */
	app.get("/api/v1/getQuote", sendQuoteList);
	
	/*GET Method: Sending json data file*/
	app.get("/api/v1/dataFile", sendDataFile);
	
	/*GET Method: Sending json data*/
	//REST API for getting Sample JSON data for google chart.
	app.get("/api/v1/SampleData", sendJSONData);

	/* File Upload Section. [Full-working Code]*/
	app.post('/api/v1/upload-file', urlEncoder, uploadFile);

/* 
	-------------------------------
	Callback Functions for Routes
	------------------------------- 
*/

// "/api/v1/getQuote"
function sendQuoteList(req, res){
	
}

// "/" Main Home [ index.html file will be served under app folder ]
	function mainRoot(req, res){
		res.status(200).send("<hr/>You Are Welcome on API Service.<hr/>");
	}
	
// "/api/v1/dataFile" Send data file 
	function sendDataFile(req, res){
		//console.log(" >>>", req.url);
		res.status(200).sendfile('./data.json');
	}
	
// "/upload-file" Receiving uploaded file and placing to configured location
	function uploadFile(req, res){
		//logging files object
		console.log( req.headers );
		console.log( req.files );
		console.log( req.body );
		res.write("You Sent Something");
		res.status(200).end("Okay");
		
		//'file' is expected under req.files object.
		if( req.files && req.files.file !== undefined){
			/* 
			Reading and copying file. 
			[File saving location will be: "app.use(express.bodyParser({uploadDir:'./uploads'}));"]
			*/
			var file = req.files.file;
			fs.readFile(file.path,  (err, data) => {
				if (err) throw err;
				fs.writeFile(destinaion_path, data, (err) => {
				    if (err) throw err;
				    console.log(' File Written Successfully. \n');
				    res.send('<center><h4><hr/><font face="calibri" color="darkred"> File Uploaded Successfully. !!! </font><hr/></h4>');
				});
			});
	
			/*Removing files from temp location*/
			 fs.unlink(req.files.file.path);
		}/*End of if*/
		else{
			res.status(404).send("Oops!!! File Not Received. Something went wrong.");
			//res.send("Oops!!! File Not Received. Something went wrong.");
			/*Checking Log for Error*/
			console.log(" Following Log>>>>>>\n ");
			console.log("--[REQ OBJ]---------------------------------------------------");
			console.log(req.headers );
			console.log(req.body );
			console.log(req.files );
			console.log("----------------------------------------------------[END]-----");
	
		}
		
	}
//=[Building SAMPLE JSON DATA]=====================================================================================
function sendJSONData(req, res){
	//making data for an API request
	var arrData = [
		{
 			"id"	: "Combo Chart",
 			"type"	: "line",
 			"data"	: [
						["Day","Target","Current","Previous"],
						["day1",50,61,20.5],
						["day2",50,26,54],
						["day3",50,77,76.5],
						["day4",50,64,47.5],
						["day5",50,56,28],
						["day6",50,66,38],
						["day7",50,76,58],
						["day8",50,86,48],
						["day9",50,96,78],
						["day10",50,106,68]
					],
			"fullWidth"	: true,
 			"option": {
						animation : {duration: 1000,easing: 'out',"startup": true},
						lineSize:0,
						title: "My Graph",
						legend: { position: "bottom" },
						chartArea:{left:0,top:0,width:"100%",height:"80%"},
						curveType: "function",
						colors: ['darkcyan', 'black', 'darkred', '#f3b49f', '#f6c7b6'],
						is3D: true,
						backgroundColor: {stroke:null, fill:'#BBDEFB', strokeSize: 0},
						hAxis : { titleTextStyle: {color: '#333'}, gridlines: {color: '#f3f3f3',count: 5}, format: '####' },
						vAxis : { minValue: 0, gridlines: {color: '#f3f3f3',count: 5}}
					}
 		},
		{
			"id"	: "Counter Chart",
			"type"	: "counter",
			"data"	: [{"label":"ACTIVE DAYS", "value":"10", "of":"22", "unit":"DAYS"}],
			"fullWidth"	: false
		},
		{
			"id"	: "Counter Chart",
			"type"	: "counter",
			"data"	: [{"label":"TARGET FOR TODAY", "value":"70", "unit":"CRORES"}],
			"fullWidth"	: false
		},
		{
			"id"	: "Counter Chart",
			"type"	: "counter",
			"data"	: [{"label":"EARNING THIS MONTH", "value":"60", "unit":"THOUSENDS"}, {"label":"MY EARNING", "value":"60"}],
			"fullWidth"	: false
		},
		{
 			"id"	: "Combo Chart",
 			"type"	: "line",
 			"data"	: [
						["Day","Target","Current","Previous"],
						["day1",50,61,20.5],
						["day2",50,26,54],
						["day3",50,77,76.5],
						["day4",50,64,47.5],
						["day5",50,56,28],
						["day6",50,66,38],
						["day7",50,76,58],
						["day8",50,86,48],
						["day9",50,96,78],
						["day10",50,106,68]
					],
			"fullWidth"	: false,
 			"option": {
						animation : {duration: 1000,easing: 'out',"startup": true},
						lineSize:0,
						title: "My Graph",
						legend: { position: "bottom" },
						chartArea:{left:0,top:0,width:"100%",height:"80%"},
						curveType: "function",
						colors: ['darkcyan', 'black', 'darkred', '#f3b49f', '#f6c7b6'],
						is3D: true,
						backgroundColor: {stroke:null, fill:'#BBDEFB', strokeSize: 0},
						hAxis : { titleTextStyle: {color: '#333'}, gridlines: {color: '#f3f3f3',count: 5}, format: '####' },
						vAxis : { minValue: 0, gridlines: {color: '#f3f3f3',count: 5}}
					}
 		},
		{
			"id"	: "Counter Chart",
			"type"	: "counter",
			"data"	: [{"label":"TARGET FOR TODAY", "value":"70", "unit":"CRORES"}],
			"fullWidth"	: false
		},
		{
			"id"	: "Counter Chart",
			"type"	: "counter",
			"data"	: [{"label":"EARNING THIS MONTH", "value":"60", "unit":"THOUSENDS"}, {"label":"MY EARNING", "value":"60"}],
			"fullWidth"	: false
		},
		{
			"id"	: "Counter Chart",
			"type"	: "counter",
			"data"	: [{"label":"EARNING THIS MONTH", "value":"60", "unit":"THOUSENDS"}, {"label":"MY EARNING", "value":"60"}],
			"fullWidth"	: false
		},
		{
 			"id"	: "Combo Chart",
 			"type"	: "pie",
 			"data"	: [
						["Day","Value"],
						["day1",5],
						["day2",10],
						["day3",30],
						["day4",40],
						["day5",25],
						["day6",5],
						["day7",50],
						["day8",70],
						["day9",500],
						["day10",70]
					],
			"fullWidth"	: true,

 		}
	];
	//Console out a log.
	console.log("\n Sending JSON Data\n");
	//Finally sending after stringify json data.
	res.status(200).send(JSON.stringify(arrData));
}
