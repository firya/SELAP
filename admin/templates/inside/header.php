<aside class="a-side">
	<a href="/admin" class="a-logo"></a>
	<nav class="a-nav">
		<a href="/admin/edit-config" class="a-nav__link <?=($active_menu == 'config') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-settings"></i>
				<span class="a-nav__text">Конфиг</span>
			</span>
		</a>
		<a href="/admin" class="a-nav__link <?=($active_menu == 'params') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-params"></i>
				<span class="a-nav__text">Параметры</span>
			</span>
		</a>
		<a href="/admin/edit-structure" class="a-nav__link <?=($active_menu == 'structure') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-page"></i>
				<span class="a-nav__text">Структура</span>
			</span>
		</a>
		<a href="/admin/edit-code" class="a-nav__link <?=($active_menu == 'code') ? "a-nav__link-active" : ""; ?>">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-css"></i>
				<span class="a-nav__text">Код</span>
			</span>
		</a>
		<a href="/admin?exit=1" class="a-nav__link a-nav__exit">
			<span class="a-nav__content">
				<i class="a-nav__icon icon-remove"></i>
				<span class="a-nav__text">Выход</span>
			</span>
		</a>
	</nav>
</aside>