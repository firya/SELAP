<?
	$Core->mail("Тема", array('test' => "1111", "test2" => "2222"), '');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>

		<title><?=$SELAP['page']['title'];?></title>
		<meta name='keywords' content='<?=$SELAP['page']['keywords'];?>'/>
		<meta name='description' content='<?=$SELAP['page']['description'];?>'/>

		<meta name='author' content='Максим Лебедев'/>
		
		<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'>
		
		<!--[if lt IE 9]>
			<script>
				var e = ('article,aside,figcaption,figure,footer,header,hgroup,nav,section,time').split(',');
				for (var i = 0; i < e.length; i++) {
					document.createElement(e[i]);
				}
			</script>
		<![endif]-->

		<link rel='stylesheet' href='/css/style.min.css'>
	</head>
	<body>
		
		<?
		$sidebar = false;
		$side_memu = array();
			
		foreach ($SELAP['menu'] as $menu_item) {
			if ($menu_item['parent'] == $SELAP['page']['url'] || ($menu_item['parent'] == $SELAP['page']['parent'] && $menu_item['parent'] != ""))
			{
				$side_menu[] = $menu_item;
				$sidebar = true;
			}
		}
		if ($sidebar) {
	?>
	
		<? foreach ($side_menu as $menu_item) {
			
			
		
		} ?>
	
		<? } ?>
		
		<script src='/js/scripts.min.js'></script>
	</body>
</html>
