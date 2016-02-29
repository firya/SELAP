<?php
	$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$dir = explode("/", substr(parse_url($url, PHP_URL_PATH), 1));


	$base_url = array_filter(explode("/", BASE_URL));

	$dir = array_diff($dir, $base_url);
	$dir = array_values($dir);

	if (!isset($_SESSION['login'])) {
		switch ($dir[1]) {
			case 'forgot':
				$template = "forgot.php";
				break;
			
			default:
				$template = "signin.php";
				break;
		}
	} else {
		switch ($dir[1]) {
			case 'edit-html':
				$active_menu = "html";
				$template = "html.php";
				break;
			case 'edit-config':
				$active_menu = "config";
				$template = "config.php";
				break;
			case 'edit-code':
				$active_menu = "code";
				$template = "code.php";
				break;
			case 'edit-structure':
				$active_menu = "structure";
				$template = "structure.php";
				break;
			case 'edit-js':
				$active_menu = "js";
				$template = "js.php";
				break;
			
			default:
				$active_menu = "params";
				$template = "params.php";
				break;
		}
	}
?>