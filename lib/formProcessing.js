/*
@Author: Ashutosh Mishra
@Sate: 23 May 2017, 17:42
@Desc: Node api backend logic
*/
//Global namespace
var formProcessing = {};

//adding functions to this object.
formProcessing.upload = function (req, res, next) {

		//Recieving and Reading submitted form.
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			//Defining path.
			var oldpath = files.filetoupload.path;
			var newpath = './uploads/' + files.filetoupload.name;
			console.info('Uploading a file ['+ files.filetoupload.name +']....\n');
			//console.log("Tmp Path => " , files.filetoupload.path);

			//Reading and writing file at the sametime asynchronously
			fs.readFile(oldpath,  function(err, data) {
				if (err) throw err;
				fs.writeFile(newpath, data, function(err) {
					if (err) throw err;
					var resJson = {'status':'200', 'Size':(files.filetoupload.size/1024)+' KB', 'message':'File Uploaded Successfully.'};
					res.status(200).send(resJson);
				});
			});
			//and then Removing files from temp location
			fs.unlink(oldpath);
		});
};

//Exporting globally
module.exports = formProcessing;
