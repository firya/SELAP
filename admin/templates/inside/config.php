<?php
	$config = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_PATH);
	$config_tree = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].CONFIG_TREE_PATH);

	$defaults = $config['config'];
	$tree = $config_tree['config'];

	$defaults_and_tree = $Core->json_and_tree_union($defaults, $tree);
	$params_form = $Core->create_form($defaults_and_tree);

	$inline_params = $Core->get_undefined_params($defaults, $tree);
?>
<form action='' method='POST' id='defaults' style='height: 100%;'>
	<div class="a-container">
			<header class="a-header a-header-page">
				<div class="a-header__right">
					<?=$Core->input("hidden", "config", "save_tree", "save_tree");?>
					<input type="submit" class='a-btn' id='save' name='save' value='Сохранить'>
				</div>
				<div class="a-header__head">
					<a href='#' class='a-btn a-btn-light a-header__open-nav i-nav-open'><i class="icon-menu"></i></a>
					<h1>Конфиг</h1>
				</div>
			</header>

			<div class="a-content">
				<?php
					print_r($params_form);
				?>
			</div>
	</div>
</form>