<?
	session_start();
	require_once("./system.php");
	$System = new System();
	$System->startInstall();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>SELAP</title>
	<meta name='author' content='Максим Лебедев'/>

	<meta name='viewport' content='width=device-width'>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<div class='s-root' id="selap"></div>
	<script src="js/scripts.js"></script>
</body>
</html>