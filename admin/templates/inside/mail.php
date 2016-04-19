<?php
	$mail_data = $JSON->get_json($_SERVER['DOCUMENT_ROOT'].BASE_URL.MAIL_DATA_PATH);
	$mail_data = array_reverse($mail_data);
	$mail_list = $Core->create_mail_list($mail_data);
?>
<div class="a-container">
		<header class="a-header a-header-page">
			<div class="a-header__head">
				<a href='#' class='a-btn a-btn-light a-header__open-nav i-nav-open'><i class="icon-menu"></i></a>
				<h1>Письма</h1>
			</div>
		</header>

		<div class="a-content">
			<?php
				print_r($mail_list);
			?>
		</div>
</div>