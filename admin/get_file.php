<?php
	require_once("config.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/json.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/core.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL.'/admin/class.phpmailer.php');
	$Core = new Core();

	if (isset($_POST['file'])) {
		echo $Core->get_file($_POST['file']);
	}
?>