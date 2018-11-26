var mysql = require('./node_modules/mysql');
var config = require('./config.json');
var validator = require('./validation.js');

function formatErrorResponse(code, errs) {
	return JSON.stringify({ 
		error  : code,
		errors : errs
	});
}

exports.handler = (event, context, callback) => {
	//instruct the function to return as soon as the callback is invoked
	context.callbackWaitsForEmptyEventLoop = false;

	//validate input
	var errors = new Array();
	
	// Validate the user input
	validator.validateCommentthingid(event.thingid, errors);
	
	if(errors.length > 0) {
		// This should be a "Bad Request" error
		callback(formatErrorResponse('BAD_REQUEST', errors));
	} else {
	
		//getConnection equivalent
		var conn = mysql.createConnection({
			host 	: config.dbhost,
			user 	: config.dbuser,
			password : config.dbpassword,
			database : config.dbname
		});
		
		//attempts to connect to the database
		conn.connect(function(err) {
		  	
			if (err)  {
				// This should be a "Internal Server Error" error
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
			} else {
				console.log("Connected!");
				var sql = "SELECT commentid, commenttext, convert_tz(comments.commentposted,@@session.time_zone,'America/New_York') as commentposted, username, attachmentid, filename FROM comments LEFT JOIN users ON comments.commentuserid = users.userid LEFT JOIN attachments ON comments.commentattachmentid = attachments.attachmentid WHERE commentthingid = ? ORDER BY commentposted ASC";
				
				conn.query(sql, [event.thingid], function (err, result) {
				  	if (err) {
						// This should be a "Internal Server Error" error
						callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
				  	} else {
				  		// Pull out just the codes from the "result" array (index '1')
				  		var commentss = [];
				  		for(var i=0; i<result.length; i++) {
				  		    var thing = {commentid: result[i]["commentid"], commenttext: result[i]["commenttext"], commentposted: result[i]["commentposted"], username: result[i]["username"], attachmentid: result[i]["attachmentid"], filename: result[i]["filename"]};
							commentss.push(thing/*result[i]['extension']*/);
						}
						// Build an object for the JSON response with the userid and reg codes
						var json = { 
							comments: commentss
						};
						// Return the json object
						callback(null, json);
						//conn.exit();
				  	}
				}); //query registration codes
			} // no connection error
		}); //connect database
	} //no validation errors
} //handler
