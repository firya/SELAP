<form action='' method='POST' id='add' class="a-popup a-form mfp-hide a-add-fields">
	<div class="a-form__header a-header">
		<h2 class='a-header__head'>Добавление поля</h2>
	</div>
	<div class="a-form__error" id='add_param_error'></div>
	<p>Добавленный алиас поля нельзя будет изменить</p>
	<div class="a-undefparam">
		<div class="a-undefparam__row">
			<div class="a-undefparam__item">
				<p>
					<label for="addfield[name]">Название поля</label><br>
					<?=$Core->input("text", "", "addfield[name]", "addfield[name]", true);?>
				</p>
			</div>
			<div class="a-undefparam__item">
				<p>
					<label for="addfield[alias]">Алиас поля</label><br>
					<?=$Core->input("text", "", "addfield[alias]", "addfield[alias]", true);?>
				</p>
			</div>
			<div class="a-undefparam__item">
				<p>
					<label for="addfield[desc]">Описание поля</label><br>
					<?=$Core->input("text", "", "addfield[desc]", "addfield[desc]", false);?>
				</p>
			</div>
			<div class="a-undefparam__item">
				<p>
					<label for="addfield[parent]">Родитель</label><br>
					<?=$Core->input("select", "", "addfield[parent]", "addfield[parent]", true, $Core->get_possible_parrents($parent_tree, $parent_prefix));?>
				</p>
			</div>
			<div class="a-undefparam__item">
				<p>
					<label for="addfield[type]">Тип поля</label><br>
					<?=$Core->input("select", "", "addfield[type]", "addfield[type]", true, unserialize(FIELD_TYPES), "i-param-type");?>
				</p>
			</div>
			<div class="a-undefparam__item a-undefparam__children a-undefparam__children-hidden">
				<p>
					<label for="addfield[children_type]">Тип потомка</label>
					<?=$Core->input("select", "", "addfield[children_type]", "addfield[children_type]", true, unserialize(CHILDREN_FIELD_TYPES), "", "disabled");?>
				</p>
			</div>
			<div class="a-undefparam__item a-undefparam__optionsblock a-undefparam__optionsblock-hidden">
				<label>Варианты</label>
				<div class="a-undefparam__options">
					<input type="text" id='addfield[options][0]' name='addfield[options][0]' class="a-input a-undefparam__option" disabled>
					<input type="text" id='addfield[options][1]' name='addfield[options][1]' class="a-input a-undefparam__option" disabled>
				</div>
				<a href="#" data-id='addfield' class="a-dashed a-undefparam__add-option">+ Добавить вариант</a>
			</div>
		</div>
	</div>
	<?=$Core->input("hidden", "1", "add_params", "add_params");?>
	<div class="a-form__footer">
		<input type="submit" class='a-btn' id='add_params' name='add_params' value='Добавить поле'>
	</div>
</form>