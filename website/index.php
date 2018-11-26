<?php

// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();

// Declare an empty array of error messages
$errors = array();

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Sports Teams</title>
	<meta name="description" content="Russell Thackston's personal website for IT 5236">
	<meta name="author" content="Russell Thackston">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/index.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<?php include 'include/header.php'; ?>

	<div class="main-surround">
	<h2>My Teams</h2>
	<p>
		A website that lets you list out and discuss any and all of your favorite sports teams.<a href="login.php">create an account</a> or proceed directly to the
		<a href="login.php">login page</a>.
	</p>
	</div>

	<?php include 'include/footer.php'; ?>
	<script src="js/site.js"></script>
</body>
</html>
