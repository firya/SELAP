<?php
	if (!isset($_SESSION['login']) || $_SESSION['login'] == "" || $_SESSION['login'] === false) {
		$doauth = true;
		if (isset($_COOKIE['hash'])) {
			if ($_COOKIE['hash'] != md5(LOGIN.PASSWORD)) {
				$_SESSION['login'] = true;
				$doauth = false;
			}
		}
		if ($doauth) {
			if (isset($_POST['signin'])) {
				if ($_POST['signin_login'] == LOGIN && $_POST['signin_password'] == PASSWORD) {
					$_SESSION['login'] = true;

					if (isset($_POST['signin_remember'])) {
						setcookie("hash", md5($_POST['signin_login'].$_POST['signin_password']), time()+(60*60*24*365));
					}
				} else {
					$_SESSION['error'] = "Неверный логин или пароль";
				}
				header("Location: ".$_SERVER['HTTP_REFERER']);
			}
		}
	}
	if (isset($_GET['exit'])) {
		unset($_SESSION['login']);
		setcookie ("hash", "", time() - 3600);
		header("Location: ".BASE_URL."/admin");
	}
?>