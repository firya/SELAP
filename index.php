<?php
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/config.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/json.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/core.php");
	require_once($_SERVER['DOCUMENT_ROOT'].'/admin/class.phpmailer.php');

	$JSON = new JSON();
	$Core = new Core();

	$config = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH);

	require_once($_SERVER['DOCUMENT_ROOT']."/admin/url.php");
?>