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
	//validator.validateUserid(event.userid, errors);

	
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
		var addOn1 = (event.loggedinuserid != event.userid) ? ", isadmin=? " : "";
		var addOn2 =(!event.password) ? ", passwordhash=?" : "";
		var sql = "UPDATE users SET username=?, email=? " + addOn1 + " " + addOn2 + " WHERE userid = ?";
		conn.query(sql, [event.username, event.email, event.passwordhash, event.isAdmin, event.userid], function (err, result) {
		  	if (err) {
				// This should be a "Internal Server Error" error
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
		  	} else {
		  		callback(null,"user updated successfuly!");
		    	
				} //good code count
		  	}); //query registration codes
		}); //connect database
	} //no validation errors
}