<?php
	session_start();
	
	require_once("admin/config.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/json.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/core.php");
	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL.'/admin/class.phpmailer.php');
	
	$JSON = new JSON();
	$Core = new Core();

	$SELAP = array();
	$SELAP['config'] = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].BASE_URL.CONFIG_PATH);

	require_once($_SERVER['DOCUMENT_ROOT'].BASE_URL."/admin/url.php");
?>