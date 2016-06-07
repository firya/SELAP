<?php
	session_start();

	require_once("../config.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/core.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/auth.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/router.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/json.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/class.phpmailer.php");

	$JSON = new JSON();
	$Core = new Core();

	$Core->check_system();

	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/forms.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/templater.php");

	$_SESSION['error'] = "";
?>