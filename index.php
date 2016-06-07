<?php
	session_start();
	
	require_once("config.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/json.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/core.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/class.phpmailer.php");
	
	$JSON = new JSON();
	$Core = new Core();

	$SELAP = array();
	$SELAP['config'] = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].BASE_URL.CONFIG_PATH);

	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/".ADMIN_FOLDER."/url.php");
?>