<?
	require_once("config.php");
	require_once("lang/index.php");
	require_once("JWT.php");

	class System {
		private $t;
		private $JWT;
		
		function __construct() {
			$lang = "en";
			if (defined('LANG')) {
				$lang = LANG;
			}
			$this->t = new Lang($lang);

			$this->JWT = new JWT();
		}

		public function startInstall() {
			$current_page = $this->currentPage();
			if (!$this->checkConfig()) {
				if ($current_page !== 'install') {
					header("Location: install");
					exit();
				}
			} else {
				if ($current_page == "install") {
					header("Location: ".BASE_URL."admin");
					exit();
				}
			}
		}

		public function checkConfig() {
			if (file_exists(dirname(__FILE__)."/config.php")) {
				if (defined('INSTALLED')) {
					return true;
				} else {
					$_SESSION['e'] = $this->t->getSentence("ERROR_CONFIG");
					return false;
				}
			} else {
				$_SESSION['e'] = $this->t->getSentence("ERROR_CONFIG_FILE");
				return false;
			}
		}

		public function genToken($token_data) {

			return $this->JWT->encode($token_data, SECRET_KEY);
		}

		public function checkToken($token, $expires = "+1 day") {
			try {
				$old_token = $this->JWT->decode($token, SECRET_KEY, 'HS256');
				
				if ($old_token->expires - strtotime("now") > 0) {
					return $old_token;
				} else {
					return false;
				}
			} catch (Exception $e) {
				return false;
			}
		}

		public function genRandomKey() {
			return md5(strtotime(date("d.m.Y G:i:s")) + rand(0, 999999));
		}

		public function currentPage() {
			$path = explode("/", $_SERVER['REQUEST_URI']);

			return $path[count($path) - 1];
		}
	}
?>