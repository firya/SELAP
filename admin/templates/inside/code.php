<form action='/admin/forms.php' class='a-codeform i-ajax' method='POST' id='code_form'>
	<div class="a-container">
		<header class="a-header a-header-page">
			<div class="a-header__right">
				<input type="submit" class='a-btn' id='save_code' name='save_code' value='Сохранить'>
			</div>
			<div class="a-header__head">
				<a href='#' class='a-btn a-btn-light a-header__open-nav i-nav-open'><i class="icon-menu"></i></a>
				<h1>Редактор кода</h1>
			</div>
		</header>
		<div class="a-content a-content-code">			
			<div class="a-redactor a-redactor-options">
				<?
					require_once($_SERVER['DOCUMENT_ROOT']."/admin/get_file.php");
					$all_files = $Core->get_all_files();
				?>
				<div class="a-redactor__options">
					<? 
						$select_value = (isset($_COOKIE['select_file'])) ? $_COOKIE['select_file'] : "";
					?>
					<?=$Core->input("select", $select_value, 'select_file', 'select_file', false, $all_files, "i-select-file");?>
				</div>
				<textarea id='code' name='code' class="a-textarea i-code"></textarea>
			</div>
		</div>
	</div>
</form>
<script src='/admin/js/codemirror/codemirror.js'></script>

<script src="/admin/js/codemirror/mode/css/css.js"></script>
<script src="/admin/js/codemirror/mode/javascript/javascript.js"></script>
<script src="/admin/js/codemirror/mode/php/php.js"></script>

<script src="/admin/js/codemirror/addon/hint/show-hint.js"></script>
<script src="/admin/js/codemirror/addon/hint/css-hint.js"></script>
<script src="/admin/js/codemirror/addon/hint/javascript-hint.js"></script>
<script src="/admin/js/codemirror/addon/edit/matchbrackets.js"></script>

<script src="/admin/js/codemirror/mode/htmlmixed/htmlmixed.js"></script>
<script src="/admin/js/codemirror/mode/xml/xml.js"></script>
<script src="/admin/js/codemirror/mode/javascript/javascript.js"></script>
<script src="/admin/js/codemirror/mode/clike/clike.js"></script>

<script>
	var CodeMirrorEditor = CodeMirror.fromTextArea(document.getElementById("code"), {
			lineNumbers: true, 
			theme: "seti", 
			matchBrackets: true,
			mode: "application/x-httpd-php",
			indentUnit: 4,
			indentWithTabs: true
		}
	);
</script>