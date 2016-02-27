<?php
	session_start();

	require_once($_SERVER['DOCUMENT_ROOT']."/admin/config.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/core.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/auth.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/router.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/json.php");
	require_once($_SERVER['DOCUMENT_ROOT'].'/admin/class.phpmailer.php');

	$JSON = new JSON();
	$Core = new Core();

	$Core->check_system();

	require_once($_SERVER['DOCUMENT_ROOT']."/admin/forms.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/templater.php");

	$_SESSION['error'] = "";
?>