<aside class="a-side">
	<a href="<?=BASE_URL;?>/admin" class="a-logo"></a>
	<nav class="a-nav">
		<a href="<?=BASE_URL;?>/admin/edit-config" class="a-nav__link <?=($active_menu == 'config') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-settings"></i>
				<span class="a-nav__text">Конфиг</span>
			</span>
		</a>
		<a href="<?=BASE_URL;?>/admin" class="a-nav__link <?=($active_menu == 'params') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-params"></i>
				<span class="a-nav__text">Параметры</span>
			</span>
		</a>
		<a href="<?=BASE_URL;?>/admin/edit-structure" class="a-nav__link <?=($active_menu == 'structure') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-page"></i>
				<span class="a-nav__text">Структура</span>
			</span>
		</a>
		<a href="<?=BASE_URL;?>/admin/mail" class="a-nav__link <?=($active_menu == 'mail') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-mail"></i>
				<span class="a-nav__text">Письма</span>
			</span>
		</a>
		<a href="<?=BASE_URL;?>/admin/edit-code" class="a-nav__link <?=($active_menu == 'code') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-css"></i>
				<span class="a-nav__text">Код</span>
			</span>
		</a>
		<a href="<?=BASE_URL;?>/admin?exit=1" class="a-nav__link a-nav__exit">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-remove"></i>
				<span class="a-nav__text">Выход</span>
			</span>
		</a>
	</nav>
</aside>