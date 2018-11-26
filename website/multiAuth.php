<?php

// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();


$theLink = "";
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	if (isset($_GET['link'])) {
    $theLink = $_GET['link'];
    echo $theLink;
  }
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	echo $_GET['link']."   ".$_POST['authCode']." $errors";
  
	$sql = "SELECT * FROM loginCode WHERE code = :code AND link = :link;";
	// Run the SQL select and capture the result code
	$stmt = $dbh->prepare($sql);
	$stmt->bindParam(":code", $_POST['authCode']);
	$stmt->bindParam(":link", $_GET['link']);
	$result = $stmt->execute();
	echo $result;
	/*if ($result === FALSE) {
		$errors[] = "An unexpected error occurred processing your email validation request";
		$this->debug($stmt->errorInfo());
		$this->auditlog("processEmailValidation error", $stmt->errorInfo());

	} else {

		if ($stmt->rowCount() != 1) {
			//DO NOT LOG USER IN
			echo "INCORRECT";
		}else{
			//LOG USER IN & DELETE loginCode from DB
			echo "CORRECT";
		}
		
	}*/
	
	/*if (isset()) {

		//$success = $app->multiAuth($_GET['link'], $authCode, $errors);
		if ($success) {
      // Redirect the user to the topics page on success
  		header("Location: list.php");
  		exit();
		}
	}*/
}

/*// Declare a set of variables to hold the username and password for the user
$username = "";
$password = "";

// Declare an empty array of error messages
$errors = array();

// If someone has clicked their email validation link, then process the request
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

	if (isset($_GET['id'])) {

		$success = $app->processEmailValidation($_GET['id'], $errors);
		if ($success) {
			$message = "Email address validated. You may login.";
		}

	}

}

// If someone is attempting to login, process their request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	// Pull the username and password from the <form> POST
	$username = $_POST['username'];
	$password = $_POST['password'];

	// Attempt to login the user and capture the result flag
	$result = $app->login($username, $password, $errors);

	// Check to see if the login attempt succeeded
	if ($result == TRUE) {

		// Redirect the user to the topics page on success
		header("Location: list.php");
		exit();

	}

}

if (isset($_GET['register']) && $_GET['register']== 'success') {
	$message = "Registration successful. Please check your email. A message has been sent to validate your address.";
}*/

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>russellthackston.me</title>
	<meta name="description" content="Russell Thackston's personal website for IT 5233">
	<meta name="author" content="Russell Thackston">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/form.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<!--1. Display Errors if any exists
	2. Display Login form (sticky):  Username and Password -->

<body>
	<?php include 'include/header.php'; ?>
	<div class="myForm">

	<h2>Login</h2>

	<?php include('include/messages.php'); ?>

		<form method="post" action="multiAuth.php?link=<?PHP echo $_GET['link']; ?>">

			<input type="text" name="authCode" id="multiAuth" placeholder="Authentication Code" />
			<br/>

			<input type="submit" value="Login" name="login" />
		</form>
	</div>
	<a href="register.php">Need to create an account?</a>
	<br/>
	<a href="reset.php">Forgot your password?</a>
	<?php include 'include/footer.php'; ?>
	<script src="js/site.js"></script>
</body>
</html>
