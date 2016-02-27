<?php
	$routes = explode('/', $_SERVER['REQUEST_URI']);
	$routes = array_slice($routes, 1);
	
	foreach ($routes as $key => $route) {
		$route = explode("?", $route);
		$routes[$key] = $route[0];
	}

	function url_decode($url) {
	    return urldecode($url);
	}

	$routes = array_map("url_decode", $routes);

	$structure = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH)['structure']['pages'];

	$SELAP = array();
	$SELAP['page'] = $Core->get_page($structure, $routes);
	$SELAP['menu'] = $Core->get_menu($structure);

	$page_template = "";
	if (!empty($SELAP['page'])) {
		$page_template = $_SERVER['DOCUMENT_ROOT'].$SELAP['page']['template'];
	}
	if (!file_exists($page_template)) {
		header("HTTP/1.0 404 Not Found");
		$page_template = $_SERVER['DOCUMENT_ROOT'].TEMPLATE_PATH."/p404.php";
	}
	require_once($page_template);
?>