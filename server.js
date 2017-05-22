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

/*Setting up*/
	app.use(express.static('public'));
	/*
	var jsonParser = bodyParser.json();
	var urlEncoder = bodyParser.urlencoded({ extended: true });
	app.configure(function() {
	    app.use(express.bodyParser({keepExtensions:true, uploadDir:'./uploads'}));
		app.use(express.static(__dirname + './app'));
	});*/

/* Starting server on defined PORT*/
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
	app.post('/api/v1/upload-form', uploadForm);

	/* General Perpose Web Api */
		//Get top News of in/about India
		app.get('/api/v1/getTopNews-in', function(req, res, next){ res.status(200).send('<hr/>You have requested the Top news about India<hr/>'); });
		//Get top News of in/about world
		app.get('/api/v1/getTopNews', function(req, res, next){ res.status(200).send('<hr/>You have requested the Top news from the glob<hr/>'); });
		//Get Temprature
		app.get('/api/v1/getTemprature', function(req, res, next){ res.status(200).send('<hr/>Current Temprature of your location<hr/>'); });

	/* Image Processing Web Api */
		//ReSize the Image
		app.get('/api/v1/encry-image', function(req, res, next){ res.status(500).send('ERROR processing');});
		app.post('/api/v1/encry-image', function(req, res, next){ res.status(500).send('ERROR processing');});
		//Change the mimetype of an image
		app.get('/api/v1/process-image-mimeType', function(req, res, next){ res.status(500).send('ERROR processing');});
/*
	----------------------------------------------------------------------------------------------------------------------------
	Callback Functions for Routes
	---------------------------------------------------------------------------------------------------------------------------
*/

// "/api/v1/getQuote"
	function sendQuoteList(req, res, next){

	}

// "/" Main Home [ index.html file will be served under app folder ]
	function mainRoot(req, res, next){
		// res.writeHead(200, {'Content-Type': 'text/html'});
		// res.write('<form action="/api/v1/upload-form" method="post" enctype="multipart/form-data">');
		// res.write('<input type="file" name="filetoupload" multiple="false"><br>');
		// res.write('<input type="submit">');
		// res.write('</form>');
		res.send('Okay');
		//res.status(200).sendfile('upload.html');
		//res.status(200).send("<hr/>Welcome to the NodeJs API Server<hr/>");
	}

// "/api/v1/dataFile" Send data file
	function sendDataFile(req, res, next){
		//res.status(200).sendfile('./data.json');
		res.status(200).sendfile('<hr/>Data is Not avaiable right now.<hr/>');
	}

// "/upload-file" Receiving uploaded file and placing to configured location
	function uploadFile(req, res, next){
		//logging files object
		console.log( req.headers );
		console.log( req.files );
		console.log( req.body );
		res.write("You Sent Something");
		res.status(200).end("You have send something... \n Looks like a File object.");

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

	//--[Function to execute on uploading a form to this server.]
	function uploadForm(req, res, next){

		//Recieving and Reading submitted form.
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			//Defining path.
			var oldpath = files.filetoupload.path;
			var newpath = './uploads/' + files.filetoupload.name;
			console.info('Uploading a file ['+ files.filetoupload.name +']....\n');
			//console.log("Tmp Path => " , files.filetoupload.path);

			//Reading and writing file at the sametime asynchronously
			fs.readFile(oldpath,  function(err, data){
				if (err) throw err;
				fs.writeFile(newpath, data, function(err){
					if (err) throw err;
					var resJson = {'status':'200', 'Size':(files.filetoupload.size/1024)+' KB', 'message':'File Uploaded Successfully.'};
					res.status(200).send(resJson);
				});
			});
			//and then Removing files from temp location
			fs.unlink(oldpath);
		});
	}

//=[Building SAMPLE JSON DATA]=====================================================================================
	function sendJSONData(req, res, next){
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
