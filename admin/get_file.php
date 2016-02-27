<?php
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/json.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/admin/core.php");
	$Core = new Core();

	if (isset($_POST['file'])) {
		echo $Core->get_file($_POST['file']);
	}
?>