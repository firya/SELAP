<?php
	function dir_to_array($dir) { 
		$result = array(); 
		$cdir = scandir($dir); 
		foreach ($cdir as $key => $value) { 
			if (!in_array($value,array(".",".."))) { 
				if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) { 
					$result[$value] = dir_to_array($dir . DIRECTORY_SEPARATOR . $value); 
				} else { 
					$result[] = $value; 
				} 
			} 
		} 

		return $result; 
	}

	function find_template($template_name, $dir_array) {
		$path = array();

		foreach ($dir_array as $key => $value) {
			if (is_array($value)) {
				$path_temp = find_template($template_name, $value);
				if (!empty($path_temp)) {
					$path[] = $key;
					$path = array_merge($path, $path_temp);
				}
			} else {
				if ($value == $template_name) {
					$path[] = $value;
					break;
				} 
			}
		}

		return $path;
	}

	function folder_to_paths($array) {
		$paths = array();
		$paths[] = $_SERVER['DOCUMENT_ROOT'].BASE_URL.TEMPLATES_PATH;
		for ($i=0; $i < count($array); $i++) { 
			$path_temp = $_SERVER['DOCUMENT_ROOT'].BASE_URL.TEMPLATES_PATH;

			for ($j=0; $j <= $i; $j++) { 
				$path_temp .= "/".$array[$j]; 
			}

			$paths[] = $path_temp;
		}

		return $paths;
	}

	function draw_template($path, $level = 0) {
		global $Core, $active_menu, $JSON;
		if (is_dir($path[$level])) {
			if (file_exists($path[$level]."/header.php")) { require_once($path[$level]."/header.php"); }
			draw_template($path, ($level+1));
			if (file_exists($path[$level]."/footer.php")) { require_once($path[$level]."/footer.php"); }
		} else {
			require_once($path[$level]);
		}
	}

	draw_template(folder_to_paths(find_template($template, dir_to_array($_SERVER['DOCUMENT_ROOT'].BASE_URL.TEMPLATES_PATH))));
?>