<?
	session_start();
	header('Content-Type: application/json');
	exit(json_encode([
		'token' => "skdfhjs kjfhs kdfjs ", 
		'userId' => "admin"
	]));


	require_once("config.php");

	$lang = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].BASE_URL.ADMIN_FOLDER."/lang/".LANG.".json"));

	if (isset($_SESSION['login'])) {
		if ($_SESSION['login'] === true) {
			login(true);
		} else {
			unset($_SESSION['login']);
			login(false);
		}
	} else if (isset($_COOKIES['user']) && isset($_COOKIES['hash'])) {
		if ($_COOKIES['user'] == LOGIN && $_COOKIES['hash'] == md5(LOGIN.PASSWORD)) {
			login(true);
		} else {
			setcookie("user", "", time() - 3600);
			setcookie("hash", "", time() - 3600);
			login(false);
		}
	} else if (isset($_POST['login']) && isset($_POST['password'])) {
		if ($_POST['login'] == LOGIN && $_POST['password'] == PASSWORD) {
			$_SESSION['login'] = true;
			login(true);

			if ($_POST['rememberme']) {
				setcookie("user", $_POST['login'], time()+(60*60*24*365));
				setcookie("hash", md5($_POST['login'].$_POST['password']), time()+(60*60*24*365));
			}
		} else {
			login(false, $lang->ERROR_LOGIN_PASSWORD);
		}
	} else {
		login(false);
	}

	function login($val, $e = null) {
		header('Content-Type: application/json');
		exit(json_encode(['login' => $val, 'e' => $e]));
	}
?>