<?
	header('Content-Type: text/html; charset=utf-8');

	if (isset($_POST['save_defaults_settings'])) {
		unset($_POST['save_defaults_settings']);

		$config = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH);
		$config_tree = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_TREE_PATH);

		$new_defaults = $config['defaults'];
		$defaults_tree = $config_tree['defaults'];
		$new_defaults_tree = $_POST;

		$keys_to_remove = $JSON->get_removed_keys($defaults_tree, $new_defaults_tree);

		for ($i = 0; $i < count($keys_to_remove); $i++) { 
			$new_defaults = $JSON->remove_json_keys($new_defaults, $keys_to_remove[$i]);
		}
		
		$config['defaults'] = $new_defaults;
		$config_tree['defaults'] = $new_defaults_tree;

		$JSON->save_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH, $config);
		$JSON->save_json($_SERVER['DOCUMENT_ROOT'].CONFIG_TREE_PATH, $config_tree);

		header("Location: ".$_SERVER["HTTP_REFERER"]);
		exit();
	}

	if (isset($_POST['save_structure_settings'])) {
		unset($_POST['save_structure_settings']);


		$config = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH);
		$config_tree = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_TREE_PATH);

		$new_structure = $config['structure'];
		$structure_tree = $config_tree['structure'];
		$new_structure_tree = array_merge_recursive(unserialize(CONFIG_TREE_DEFAULT)['structure'], $_POST);

		$keys_to_remove = $JSON->get_removed_keys($structure_tree, $new_structure_tree);

		for ($i = 0; $i < count($keys_to_remove); $i++) { 
			$new_structure = $JSON->remove_json_keys($new_structure, $keys_to_remove[$i]);
		}

		$config['structure'] = $new_structure;
		$config_tree['structure'] = $new_structure_tree;

		$JSON->save_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH, $config);
		$JSON->save_json($_SERVER['DOCUMENT_ROOT'].CONFIG_TREE_PATH, $config_tree);

		header("Location: ".$_SERVER["HTTP_REFERER"]);
		exit();
	}

	if (isset($_POST['save'])) {
		unset($_POST['save']);

		$json = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH);
		
		if (isset($_POST['save_tree'])) {
			$tree_item = $_POST['save_tree'];
			unset($_POST['save_tree']);
			$json[$tree_item] = $_POST;
		} else {
			$json['defaults'] = $_POST;
		}

		$JSON->save_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH, $json);

		header("Location: ".$_SERVER["HTTP_REFERER"]);
		exit();
	}

	if (isset($_POST['add_params'])) {
		unset($_POST['add_params']);

		$parent = $_POST['addfield']['parent'];
		unset($_POST['addfield']['parent']);
		$alias = $_POST['addfield']['alias'];
		unset($_POST['addfield']['alias']);

		if (isset($_POST['addfield']['children_type'])) {
			if ($_POST['addfield']['children_type'] == "") {
				unset($_POST['addfield']['children_type']);
				$_POST['addfield']['children'] = array();
			}
		}

		if ($parent != " ") {
			$parent = explode("|", $parent);
		} else {
			$parent = array();
		}

		$element = array();
		$element[$alias] = $_POST['addfield'];

		$json_tree = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_TREE_PATH);

		$parent_array = array();

		foreach ($parent as $key => $value) {
			$parent_array[] = $value;
		}

		$parent_array = array_reverse($parent_array);

		for ($i=0; $i < count($parent_array); $i++) { 
			$temp_element = $element;
			$element = array();
			if ($i < count($parent_array) - 1) {
				$element[$parent_array[$i]]['children'] = $temp_element;
			} else {
				$element[$parent_array[$i]] = $temp_element;
			}
		}

		$json_tree = array_merge_recursive($json_tree, $element);
		$JSON->save_json($_SERVER['DOCUMENT_ROOT'].CONFIG_TREE_PATH, $json_tree);

		header("Location: ".$_SERVER["HTTP_REFERER"]);
		exit();
	}

	if (isset($_POST['check_alias'])) {
		require_once($_SERVER['DOCUMENT_ROOT']."/admin/config.php");
		require_once($_SERVER['DOCUMENT_ROOT']."/admin/core.php");
		require_once($_SERVER['DOCUMENT_ROOT']."/admin/json.php");
		$Core = new Core();
		$JSON = new JSON();

		$parent = $_POST['parent'];
		$alias = $_POST['alias'];

		if (!preg_match("/^[a-z0-9]+$/i", $alias)) {
			echo "false";
			exit();
		}

		if ($parent != " ") {
			$parent = explode("|", $parent);
		} else {
			$parent = array();
		}

		$parent_array = array();

		foreach ($parent as $key => $value) {
			$parent_array[] = $value;
		}

		$key_array = $parent_array;
		if ($alias != "") {
			$key_array[] = $alias;
		}

		$json_tree = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_TREE_PATH);
		$json_tree_item = $json_tree[$key_array[0]];
		array_shift($key_array);

		if ($Core->check_alias($json_tree_item, $key_array)) {
			echo "true";
		} else {
			echo "false";
		}
		exit();
	}

	if (isset($_POST['save_code'])) {
		file_put_contents($_POST['select_file'], rawurldecode($_POST['code']));

		exit();
	}
?>