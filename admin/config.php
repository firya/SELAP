<?php
	define("LOGIN", "admin"); // Логин доступа в админ панель
	define("PASSWORD", "password1"); // Пароль доступа в админ панель

	define("BASE_URL", ""); // Путь до директории в которую установлена админ-панель
	define("CONFIG_PATH", "/config.json"); // Путь к файлу, где будет храниться конфиг
	define("CONFIG_TREE_PATH", "/admin/config_tree.json"); // Путь к файлу, где будет храниться вспомогательный конфиг
	define("FILEMANAGER_PATH", "/files"); // Папка в которую будут загружаться файлы
	define("TEMPLATE_PATH", "/templates"); // Путь к шаблонам
	define("CSS_PATH", "/css"); // путь к css файлам
	define("JS_PATH", "/js"); // путь к js файлам

	define("TEMPLATES_PATH", "/admin/templates");
	define("FIELD_TYPES", serialize(array(
		"text" 		=> "Строка", 
		"date" 		=> "Дата", 
		"time" 		=> "Время", 
		"datetime" 	=> "Дата и время", 
		"select" 	=> "Выпадающий список", 
		"textarea" 	=> "Текст", 
		"wysiwyg" 	=> "Визуальный редактор", 
		"file" 		=> "Файл", 
		"checkbox" 	=> "Флажок", 
		"radio" 	=> "Переключатель", 
		"array" 	=> "Массив"
	)));
	define("CHILDREN_FIELD_TYPES", serialize(array(
		"" 			=> "Нет", 
		"text" 		=> "Строка", 
		"date" 		=> "Дата", 
		"time" 		=> "Время", 
		"datetime" 	=> "Дата и время", 
		"textarea" 	=> "Текст", 
		"wysiwyg" 	=> "Визуальный редактор", 
		"file" 		=> "Файл"
	)));

	define("CONFIG_DEFAULT", serialize(array(
		"config" => array(
			"email_to" => array(
				"info@".$_SERVER['SERVER_NAME']
			), 
			"email_from" => "info@".$_SERVER['SERVER_NAME']
		), 
		"defaults" => array(), 
		"structure" => array(
			"pages" => array(
				array(
					"url" => "",
					"name" => "Главная",
					"template" => "index.php",
					"title" => "",
					"keywords" => "",
					"description" => "",
					"parent" => ""
				)
			)
		)
	)));

	define("CONFIG_TREE_DEFAULT", serialize(array(
		"config" => array(
			"email_to" => array(
				"name" => "E-mail куда будут отправляться письма",
				"desc" => "Вы можете использовать функцию \$Core->mail() для отправки писем на указанные e-mail адреса",
				"type" => "array", 
				"children_type" => "text"
			), 
			"email_from" => array(
				"name" => "E-mail с которого будет отправляться почта",
				"desc" => "",
				"type" => "text"
			)
		), 
		"defaults" => array(), 
		"structure" => array(
			"pages" => array(
				"name" => "Страницы",
			    "desc" => "",
			    "type" => "array",
			    "tab_header" => "name",
			    "children" => array(
			    	"url" => array(
						"name" => "Ссылка", 
						"desc" => "", 
						"type" => "text"
					),
					"name" => array(
						"name" => "Название страницы", 
						"desc" => "", 
						"type" => "text"
					), 
					"template" => array(
						"name" => "Шаблон страницы", 
						"desc" => "", 
						"type" => "select", 
						"options" => "%templates%"
					), 
					"title" => array(
						"name" => "Заголовок", 
						"desc" => "", 
						"type" => "text"
					), 
					"keywords" => array(
						"name" => "Ключевые слова", 
						"desc" => "", 
						"type" => "text"
					), 
					"description" => array(
						"name" => "Описание", 
						"desc" => "", 
						"type" => "textarea"
					), 
					"parent" => array(
						"name" => "Родительская категория", 
						"desc" => "", 
						"type" => "select", 
						"options" => "%pages%"
					)
			    )
			)
		)
	)));
?>