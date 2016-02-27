<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>

		<title><?=$SELAP['page']['title'];?></title>
		<meta name='keywords' content='<?=$SELAP['page']['keywords'];?>'/>
		<meta name='description' content='<?=$SELAP['page']['description'];?>'/>

		<meta name='author' content='Максим Лебедев'/>

		<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'>
		<style>
			html, body {
				height: 100%;
				padding: 0;
				margin: 0;
			}
			.page-center {
				color: #497884;
				position: absolute;
				left: 50%;
				top: 50%;
				line-height: 1;
				transform: translate(-50%, -50%);
				text-align: center;
			}
			.page-404 {
				font-weight: bold;
				font-size: 80px;
			}
			.page-text {
				line-height: 2;
			}
		</style>
	</head>
	<body>
		<div class="page-center">
			<div class="page-404">404</div>
			<div class="page-text">Страница не найдена <br><a href="/">Нажмите сюда, чтобы вернуться на главную</a></div>
		</div>
	</body>
</html>