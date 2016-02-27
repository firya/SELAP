<?php
	class JSON {
		function __construct() {

		}

		//get or create file by path
		public function get_json($path, $array = true) {
			if (!file_exists($path)) {
				$createfile = fopen($path, "w");
			}
			$json = file_get_contents($path);
			if (!json_decode($json) || $json == "") {
				$json = array();
			} else {
				$json = json_decode($json, $array);
			}
			return $json;
		}

		//save array to json file
		public function save_json($path, $data) {
			$fp = fopen($path, 'w');
			fwrite($fp, json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
			fclose($fp);
		}

		// get json value by key array
		// $json - input json file
		// $id - key array like array("key1", "key2", ..., "keyN")
		public function get_json_value($json, $id, $level = 0) {
			$value = "";

			if ($level == count($id) - 1) {
				$value = $json[$id[$level]];
			} else {
				foreach ($json as $key => $val) {
					if ($key == $id[$level]) {
						$value = $this->get_json_value($val, $id, ($level+1));
					}
				}
			}
			return $value;
		}

		//change json value by key array
		// $json - input json file
		// $id - key array like array("key1", "key2", ..., "keyN")
		// $value - input value
		public function change_json_value($json, $id, $value, $level = 0) {
			$new_json = array();

			if ($level == count($id) - 1) {
				$new_json = $json;
				$new_json[$id[$level]] = $value;
			} else {
				foreach ($json as $key => $val) {
					if ($key == $id[$level]) {
						$new_json[$key] = $this->change_json_value($val, $id, $value, ($level+1));
					} else {
						$new_json[$key] = $val;
					}
				}
			}
			return $new_json;
		}

		//check key exist in json
		public function json_key_exist($json, $key) {
			if (isset($json[$key])) {
				return true;
			} else {
				return false;
			}
		}

		//check key exist in json
		public function get_json_key($json, $key) {
			if (isset($json[$key])) {
				return $json[$key];
			} else {
				return "";
			}
		}

		//get all elements include key
		public function find_elements_with_key($json, $key, $prefix = "") {
			$array = array();

			if (count($json) > 0) {
				foreach ($json as $json_key => $json_value) {
					$temp_prefix = ($prefix != "") ? $prefix."|".$json_key : $json_key;

					if ($this->json_key_exist($json_value, $key)) {
						$array[] = $temp_prefix;
					}
					if ($this->json_key_exist($json_value, "children")) {
						$array = array_merge($array, $this->find_elements_with_key($json_value['children'], $key, $temp_prefix));
					}
				}
			}

			return $array;
		}

		public function get_all_values($json, $key_array, $level = 0) {
			$values = array();

			if ($level < (count($key_array) - 1)) {
				if (isset($json[$key_array[$level]])) {
					if ($this->is_index_array($json[$key_array[$level]])) {
						for ($i = 0; $i < count($json[$key_array[$level]]); $i++) { 
							$values = array_merge($values, $this->get_all_values($json[$key_array[$level]][$i], $key_array, ($level+1)));
						}
					} else {
						$values = array_merge($values, $this->get_all_values($json[$key_array[$level]], $key_array, ($level+1)));
					}
				} else {
					$values = array();
				}
			} else if ($level == (count($key_array) - 1)) {
				if (isset($json[$key_array[$level]])) {
					if (is_array($json[$key_array[$level]])) {
						foreach ($json[$key_array[$level]] as $value) {
							array_push($values, $value);
						}
					} else if ($json[$key_array[$level]] != "") {
						array_push($values, $json[$key_array[$level]]);
					}
				}
			}

			return $values;
		}

		public function is_index_array($array) {
			if (is_array($array) && !empty($array)) {
				return is_int(array_keys($array)[0]);
			}
			return false;
		}

		//difference between two arrays
		public function get_removed_keys($array1, $array2, $key_array = array()) {
			$keys = array();
			
			foreach ($array1 as $k => $v) {
				if (isset($array2[$k])) {
					if (isset($v['children'])) {
						$key_array[] = $k;
						if (isset($array2[$k]['children'])) {
							$new_array_2 = $array2[$k]['children'];
						} else {
							$new_array_2 = array();
						}
						$keys = array_merge($keys, $this->get_removed_keys($array1[$k]['children'], $new_array_2, $key_array));
					}
				} else {
					$temp_key_array = $key_array;
					$temp_key_array[] = $k;
					$keys[] = $temp_key_array;
				}
			}

			return $keys;
		}

		public function remove_json_keys($json, $key_array, $level = 0) {
			$new_json = array();

			if ($level < (count($key_array) - 1)) {
				foreach ($json as $key => $value) {
					if ($key != $key_array[$level]) {
						$new_json[$key] = $value;
					} else {
						if ($this->is_index_array($json[$key_array[$level]])) {
							for ($i = 0; $i < count($json[$key_array[$level]]); $i++) { 
								$new_json[$key][] = $this->remove_json_keys($json[$key_array[$level]][$i], $key_array, ($level+1));
							}
						} else {
							$new_json[$key] = $this->remove_json_keys($json[$key_array[$level]], $key_array, ($level+1));
						}
					}
				}
			} else if ($level == (count($key_array) - 1)) {
				foreach ($json as $key => $value) {
					if ($key != $key_array[$level]) {
						$new_json[$key] = $value;
					}
				}
			}

			return $new_json;
		}
	}
?>