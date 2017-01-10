<?
	header('Content-Type: application/json');

	$_POST = json_decode(file_get_contents('php://input'), true);

	require_once("../config.php");
	require_once("../system.php");
	require_once("../lang/index.php");
	require_once("../JWT.php");

	$url = parse_url($_SERVER['REQUEST_URI']);
	$request = '';
	$request = $url['path'];

	$request = explode("/", $request);
	$request = $request[count($request)-1];

	class API {
		private $SYSTEM;
		private $DB;
		private $get;
		private $post;
		private $t;

		function __construct($get = array(), $post = array()) {
			$this->SYSTEM = new System();
			$this->get = $get;
			$this->post = $post;

			if (defined('STORAGE_TYPE')) {
				require_once(__DIR__.'/../db/'.STORAGE_TYPE.'.php');
				$storageClass = strtoupper(STORAGE_TYPE);
				$data = array();
				switch (STORAGE_TYPE) {
					case 'mysql':
						$data = array(
							"db_host" => DB_HOST, 
							"db_name" => DB_NAME, 
							"db_login" => DB_LOGIN, 
							"db_password" => DB_PASSWORD, 
							"db_prefix" => DB_PREFIX, 
						);
						break;
					
					default:
						$data = array();
						break;
				}
				$this->DB = new $storageClass($data);
			}

			if (array_key_exists("lang", $this->get)) {
				$lang = $this->get['lang'];
			} else {
				if (defined('LANG')) {
					$lang = LANG;
				} else {
					$lang = "en";
				}
			}

			$this->t = new Lang($lang);
		}

		public function getVocabulary($l = '') {
			if ($l == '') {
				if (array_key_exists("lang", $this->get)) {
					$l = $this->get['lang'];
				}
			}
			if (defined("LANG")) {
				$l = LANG;
			}
			$lang = Array();
			$lang['vocabularies'] = $this->t->getVocabularies();

			$language = $this->t->getVocabulary($l);

			$lang['t'] = $language['t'];
			$lang['current'] = $language['current'];
			return $lang;
		}

		public function postConfig($data = array()) {
			if (!defined('INSTALLED')) {
				if (empty($data)) {
					$data = $this->post;
				}
				$storageClass = strtoupper($data['storageType']);

				if (isset($data['storageType'])) {
					require_once(__DIR__.'/../db/'.$data['storageType'].'.php');

					$this->DB = new $storageClass($data);

					if ($this->DB->status) {
						if (is_writable(__DIR__."/../config.php")) {
							$data_array = array(
								"define('INSTALLED', true);", 
								"define('LOGIN', '".$data['login']."');", 
								"define('PASSWORD', '".$data['password']."');", 
								"define('LANG', '".$data['language']."');", 
								"define('STORAGE_TYPE', '".$data['storageType']."');", 
								"define('SECRET_KEY', '".$this->SYSTEM->genRandomKey()."');"
							);
							switch ($data['storageType']) {
								case 'mysql':
									array_push($data_array, "define('DB_HOST', '".$data['db_host']."');");
									array_push($data_array, "define('DB_NAME', '".$data['db_name']."');");
									array_push($data_array, "define('DB_LOGIN', '".$data['db_login']."');");
									array_push($data_array, "define('DB_PASSWORD', '".$data['db_password']."');");
									array_push($data_array, "define('DB_PREFIX', '".$data['db_prefix']."');");
									break;
								case 'json':
									array_push($data_array, "define('DATA_KEY', '".$this->SYSTEM->genRandomKey()."');");
									break;
								default:
									break;
							}

							$data = implode("\r\n", $data_array);
							$filecontent = file_get_contents('../config.php');
							$pos = strpos($filecontent, '?>');
							$filecontent = substr($filecontent, 0, $pos).$data."\r\n".substr($filecontent, $pos);

							file_put_contents("../config.php", $filecontent);

							return true;
						} else {
							return "ERROR_CONFIG_PERMISSION";
						}
					} else {
						return $this->DB->error;
					}
				}
			}
			return false;
		}

		public function signin() {
			$data = array();
			if (isset($this->post['login']) && isset($this->post['password'])) {
				if ($this->post['login'] == LOGIN && $this->post['password'] == PASSWORD) {
					$data["username"] = LOGIN;
					$expires = "+15 minutes";
					$remember = false;
					if ($this->post['remember']) {
						$remember = true;
						$expires = "+1 day";
					}
					$token_data = array(
						"expires" => strtotime($expires), 
						"remember" => $remember
					);
					$data["token"] = $this->SYSTEM->genToken($token_data);
					$data["admin"] = true;
				}
				else {
					$data["error"] = "ERROR_LOGIN_PASSWORD";
				}
			} else {
				$data["error"] = "ERROR_LOGIN_PASSWORD";
			}
			
			return $data;
		}

		public function renewToken() {
			if (isset($this->post['token'])) {
				$old_token = $this->SYSTEM->checkToken($this->post['token']);
				

				if ($old_token->expires) {
					$data = array();

					$expires = "+15 minutes";
					$remember = false;

					if ($old_token->remember) {
						$remember = true;
						$expires = "+1 day";
					}

					$token_data = array(
						"expires" => strtotime($expires), 
						"remember" => $remember
					);

					$data["token"] = $this->SYSTEM->genToken($token_data);

					return $data;
				} else {
					return false;
				}
			}
			return false;
		}

		public function checkMySQL() {
			if (!defined("INSTALLED")) {
				if (!is_object($this->DB)) {
					require_once(__DIR__.'/../db/mysql.php');
					$this->post['code'] = true;
					$this->DB = new MYSQL($this->post);
				}

				if ($this->DB->status) {
					return true;
				} else {
					switch ($this->DB->error) {
						case '1044':
						case '1049':
							$return = array("db_name" => array("error" => "MYSQL_ERROR_DATABASE"));
							break;
						case '1045':
							$return = array(
								"db_login" => array("error" => "MYSQL_ERROR_CONNECTION"), 
								"db_password" => array("error" => "MYSQL_ERROR_CONNECTION"), 
								"db_host" => array("error" => "MYSQL_ERROR_CONNECTION"));
							break;
						
						default:
							$return = array("db_name" => array("error" => "ERROR_SOMETHING_WENT_WRONG"));
							break;
					}
					return $return;
				}
			}
		}

		public function getVariables() {
			return $this->DB->getVariables();
		}
	}

	$api = new API($_GET, $_POST);

	if (method_exists($api, $request)) {
		print_r(json_encode($api->$request(), JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
		return;
	} else {
		json_encode(['error' => 'method not found']);
		return;
	}
?>