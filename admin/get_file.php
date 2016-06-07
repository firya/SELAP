<?php
	require_once("../config.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/json.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/core.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/class.phpmailer.php");
	$Core = new Core();

	if (isset($_POST['file'])) {
		echo $Core->get_file($_POST['file']);
	}
?>