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

	//validate input
	var errors = new Array();
	
	// Validate the user input
	validator.validateCommenttext(event.commenttext, errors);
	validator.validateUserid(event.commentuserid, errors);
	validator.validateCommentthingid(event.commentthingid, errors);
	
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

	//prevent timeout from waiting event loop
	context.callbackWaitsForEmptyEventLoop = false;

	//attempts to connect to the database
	conn.connect(function(err) {
		if (err)  {
			// should be a "Internal Server Error" error
			callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
		};
		console.log("Connected!");
		var sql = "INSERT INTO comments VALUES (?,?,now(),?,?,?)";
		conn.query(sql, [event.commentid, event.commenttext, event.commentuserid, event.commentthingid, event.commentattachmentid], function (err, result) {
		  	if (err) {
				// This should be a "Internal Server Error" error
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
		  	} else {
		  		callback(null,"Comment added successfuly!");
		    	
				} //good code count
		  	}); //query registration codes
		}); //connect database
	} //no validation errors
}