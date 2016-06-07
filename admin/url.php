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

	$base_url = array_filter(explode("/", BASE_URL));

	$routes = array_diff($routes, $base_url);
	$routes = array_map("url_decode", $routes);
	$routes = array_values($routes);

	$structure = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].BASE_URL.CONFIG_PATH)['structure']['pages'];

	$SELAP['page'] = $Core->get_page($structure, $routes);
	$SELAP['menu'] = $Core->get_menu($structure);

	$page_template = "";
	if (!empty($SELAP['page'])) {
		$page_template = $_SERVER['DOCUMENT_ROOT'].BASE_URL.$SELAP['page']['template'];
	}
	
	if (!file_exists($page_template)) {
		header("HTTP/1.0 404 Not Found");
		$page_template = $_SERVER['DOCUMENT_ROOT'].BASE_URL.TEMPLATE_PATH."/p404.php";
	}
	require_once($page_template);
?>