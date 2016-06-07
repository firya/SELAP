<form action='' method='POST' id='settings' class="a-popup a-form mfp-hide a-edit-fields">
	<div class="a-form__header a-header">
		<h2 class='a-header__head'>Настройка полей</h2>
	</div>
	<p>Поля отмеченные желтым цветом будут отображаться в админ-панели после назначения имени и типа</p>
	<?php
		foreach ($inline_params as $value) {
			$id = "";
			foreach ($value['key'] as $key_value) {
				$id .= ($id == "") ? $key_value : "[children][".$key_value."]";
			}

			$name = implode(" > ", $value['key']);

			$desc = "";
			if (isset($value['value'])) {
				if (is_array($value['value'])) {
					$desc_text = implode(', ', $value['value']);
					if (strlen($desc_text) > 40) {
						$desc_text = mb_substr(strip_tags($desc_text), 0, 40)."...";
					}
				} else {
					print_r($value);
					$desc_text = mb_substr(strip_tags($value['value']), 0, 40)."...";
				}
				if ($desc_text != "") {
					$desc = "<small class='a-undefparam__desc'>Примеры значений: <i>".$desc_text."</i></small>";
				}
			}

			$undef_class = ($value['name'] == "" || $value['type'] == "") ? "a-undefparam__undef" : "";

			$type_select_disabled = "";
			if (isset($value['parent'])) {
				$type_select_disabled = "disabled";
			}

			$option_class = "";
			$option_disabled = "";
			if ($value['type'] != "select" && $value['type'] != "radio") {
				$option_class = "a-undefparam__optionsblock-hidden";
				$option_disabled = "disabled";
			}

			$children_class = "";
			$children_disabled = "";
			if ($value['type'] != "array") {
				$children_class = "a-undefparam__children-hidden";
				$children_disabled = "disabled";
			}
	?>
	<div class="a-undefparam <?=$undef_class;?>" data-children="<?=implode("|", $value['key'])?>">
		<div class="a-undefparam__head">
			<h3 class='a-undefparam__header'><?=$name;?></h3>
			<a href='#' class='a-undefparam__remove a-dashed'>Удалить поле</a>
		</div>
		
		<div class='a-undefparam__row'>
			<div class='a-undefparam__item'>
				<label for="<?=$id;?>[type]" class='a-undefparam__label'>Тип поля</label>
				<? 
					if ($type_select_disabled != "") {
						print_r($Core->input("hidden", $value['type'], $id."[type]", $id."[type]", false, array(), ""));
					}
					print_r($Core->input("select", $value['type'], $id."[type]", $id."[type]", false, unserialize(FIELD_TYPES), "a-undefparam__type i-param-type", $type_select_disabled));
				?>
			</div>
			<div class='a-undefparam__item'>
				<label for="<?=$id;?>[name]" class="a-undefparam__label">Название поля</label>
				<?=$Core->input("text", $value['name'], $id."[name]", $id."[name]", false, array(), "a-undefparam__name");?>
				<?=$desc;?>
			</div>
			<div class='a-undefparam__item'>
				<label for="<?=$id;?>[desc]" class="a-undefparam__label">Описание поля</label>
				<?=$Core->input("text", $value['desc'], $id."[desc]", $id."[desc]", false, array(), "a-undefparam__name");?>
			</div>
			<? if ($value['type'] == "array" && !isset($value['children_type'])) { ?>
			<div class='a-undefparam__item'>
				<label for="<?=$id;?>[tab_header]" class="a-undefparam__label">Поле для заголовка</label>
				<?=$Core->input("select", $value['tab_header'], $id."[tab_header]", $id."[tab_header]", false, $Core->get_children($tree, $value['key']), "a-undefparam__name");?>
				<small class='a-undefparam__desc'>Будет отображаться в заголовке элемента массива</small>
			</div>
			<? } ?>
			<? if (!isset($value['parent'])) { ?>
				<div class='a-undefparam__item a-undefparam__optionsblock <?=$option_class;?>'>
					<label>Варианты</label>
					<div class='a-undefparam__options'>
					<? 
						if (isset($value['options'])) {
							if (!empty($value['options'])) {
								$option_counter = 0;
								foreach ($value['options'] as $option) {
									if ($option != "") {
										print_r($Core->input("text", $option, $id."[options][".$option_counter."]", $id."[options][".$option_counter."]", false, array(), "a-undefparam__option", $option_disabled));
										$option_counter++;
									}
								}
							} else {
								print_r($Core->input("text", "", $id."[options][0]", $id."[options][0]", false, array(), "a-undefparam__option", $option_disabled));
								print_r($Core->input("text", "", $id."[options][1]", $id."[options][1]", false, array(), "a-undefparam__option", $option_disabled));
							}
						} else {
							print_r($Core->input("text", "", $id."[options][0]", $id."[options][0]", false, array(), "a-undefparam__option", $option_disabled));
							print_r($Core->input("text", "", $id."[options][1]", $id."[options][1]", false, array(), "a-undefparam__option", $option_disabled));
						}
					?>
					</div>
					<a href='#' data-id='<?=$id;?>' class='a-dashed a-undefparam__add-option'>+ Добавить вариант</a>
				</div>
				<div class='a-undefparam__item a-undefparam__children <?=$children_class;?>'>
					<label for='<?=$id;?>[children_type]'>Тип потомка</label>
					<?=$Core->input("select", $value['children_type'], $id."[children_type]", $id."[children_type]", false, unserialize(CHILDREN_FIELD_TYPES), "a-select a-undefparam__childrentype", $children_disabled);?>
				</div>
			<? } ?>
		</div>
	</div>
	<? } ?>
	<div class='a-form__footer'>
		<input type='submit' class='a-btn' name='save_<?=$save_prefix;?>_settings' id='save_<?=$save_prefix;?>_settings' value='Сохранить'>
	</div>
</form>