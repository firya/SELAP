<div class="a-bg">
	<form method='POST' class="a-middleblock a-signin a-form">
		<div class="a-form__header a-header">
			<a href="/admin/forgot" class="a-header__right">Забыли пароль?</a>
			<h2 class='a-header__head'>Войти</h2>
		</div>
		<? if (isset($_SESSION['error'])) { ?>
			<div class="a-signin__error"><?=$_SESSION['error'];?></div>
		<? } ?>
		<p>
			<label for="signin_login">Логин</label><br>
			<?=$Core->input("text", 'admin', 'signin_login', 'signin_login', true);?>
		</p>
		<p>
			<label for="signin_password">Пароль</label><br>
			<?=$Core->input("password", 'password1', 'signin_password', 'signin_password', true);?>
		</p>
		<p><input type="checkbox" class='a-checkbox' id='signin_remember' name='signin_remember'><label for="signin_remember">Запомнить меня</label></p>
		<div class="a-form__footer">
			<input type="submit" value='Войти' id='signin' name='signin' class='a-btn'>
		</div>
	</form>
</div>