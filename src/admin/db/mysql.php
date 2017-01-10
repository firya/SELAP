<?
	require_once("../config.php");

	class MYSQL {
		private $dbh;
		private $prefix = '';
		public $status = false;
		public $error = '';

		function __construct($data) {
			if (isset($data['db_host']) && isset($data['db_name']) && isset($data['db_login']) && isset($data['db_password'])) {
				$code = false;
				if (isset($data['code'])) {
					$code = $data['code'];
				}

				if (isset($data['db_prefix'])) {
					$this->prefix = $data['db_prefix'];
				}

				$conn = $this->connect($data['db_host'], $data['db_name'], $data['db_login'], $data['db_password'], $code);
				if ($conn) {
					if (!$this->check_db()) {
						$this->install();
					}
				} else {
					return $conn;
				}
			}
		}

		private function connect($host, $db, $login, $password, $code = false) {
			try {
				$this->dbh = new PDO('mysql:host='.$host.';dbname='.$db, $login, $password);
				$this->status = true;
			} catch (PDOException $e) {
				if ($code) {
					$this->error = $this->error = $e->getCode();
				} else {
					switch ($e->getCode()) {
						case '1044':
						case '1049':
							$this->error = "MYSQL_ERROR_DATABASE";
							break;
						case '1045':
							$this->error = "MYSQL_ERROR_CONNECTION";
							break;
						
						default:
							$this->error = "ERROR_SOMETHING_WENT_WRONG";
							break;
					}
				}
			}
		}

		private function check_db() {
			if (is_object($this->dbh)) {
				if ($this->tableExists($this->prefix."variables") && $this->tableExists($this->prefix."mail") && $this->tableExists($this->prefix."structure")) {
					return true;
				}
				return false;
			}
			return false;
		}

		private function tableExists($table) {
		    try {
		        $result = $this->dbh->query("SELECT 1 FROM $table LIMIT 1");
		    } catch (Exception $e) {
		        return false;
		    }
		    return $result !== false;
		}

		public function getVariables() {
			return $this->dbh->query("SELECT * FROM ".DB_PREFIX."variables")->fetchAll(PDO::FETCH_ASSOC);
		}

		public function install() {
			if (!defined('INSTALLED')) {
				$sql = "CREATE TABLE IF NOT EXISTS `".$this->prefix."variables` (
						`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
						`parent` int(11) DEFAULT NULL,
						`config` tinyint(1) DEFAULT NULL,
						`page` tinyint(1) DEFAULT NULL,
						`label` varchar(256) DEFAULT NULL,
						`tab_header` int(11) DEFAULT NULL,
						`name` varchar(256) DEFAULT NULL,
						`type` varchar(32) DEFAULT NULL,
						`desc` varchar(256) DEFAULT NULL,
						`options` text,
						`value` text,
						`order` int(11) DEFAULT NULL,
						`date` datetime DEFAULT NULL,
						PRIMARY KEY (`id`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;

						CREATE TABLE IF NOT EXISTS `".$this->prefix."mail` (
						`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
						`subject` text,
						`body` text,
						`date` datetime DEFAULT NULL,
						PRIMARY KEY (`id`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;

						CREATE TABLE IF NOT EXISTS `".$this->prefix."structure` (
						`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
						`name` varchar(256) DEFAULT NULL,
						`parent` int(11) DEFAULT NULL,
						`url` varchar(256) DEFAULT NULL,
						`title` varchar(256) DEFAULT NULL,
						`keywords` text,
						`description` text,
						`content` text,
						`order` int(11) DEFAULT NULL,
						`date` datetime DEFAULT NULL,
						PRIMARY KEY (`id`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

				$this->dbh->exec($sql);
				return true;
			}
			return false;
		}
	}
?>