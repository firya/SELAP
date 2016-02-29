<?php
	session_start();

	require_once("config.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/core.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/auth.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/router.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/json.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL.'/admin/class.phpmailer.php');

	$JSON = new JSON();
	$Core = new Core();

	$Core->check_system();

	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/forms.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/templater.php");

	$_SESSION['error'] = "";
?>