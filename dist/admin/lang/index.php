<?
	class Lang {
		public $default_vocabulary = array();
		public $vocabulary = array();

		function __construct($lang) {
			
		}

		public function getSentence($id) {
			if (isset($vocabulary[$id])) {
				return $this->vocabulary[$id];
			}

			return "Undefined";
		}

		public function getVocabulary($lang) {
			if ($lang == '') {
				$lang = "en";
			}

			$this->default_vocabulary = include(dirname(__FILE__)."/en.php");

			if (file_exists(dirname(__FILE__)."/".$lang.".php")) {
				$this->vocabulary = include(dirname(__FILE__)."/".$lang.".php");
			}
			$this->vocabulary = array_merge($this->default_vocabulary, $this->vocabulary);

			return array("t" => $this->vocabulary, "current" => $lang);
		}

		public function getVocabularies() {
			$result = array();

			$dir = dirname(__FILE__);
			$cdir = scandir($dir); 
			foreach ($cdir as $key => $value) {
				if (!in_array($value, array(".", "..", "index.php"))) { 
					if (!is_dir($dir.DIRECTORY_SEPARATOR.$value)) {
						$result[] = pathinfo($value, PATHINFO_FILENAME);
					} 
				} 
			} 

			return $result; 
		}
	}
?>