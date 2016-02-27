		<script src='/admin/js/scripts.min.js'></script>
		<script src="/admin/js/tinymce/tinymce.min.js"></script>
		<?
			if (isset($_SESSION['add_param_error'])) {
		?>
				<script>
					$(function() {
						$.magnificPopup.open({
							items: {
								src: '#add'
							},
							type: 'inline'
						}, 0);
					});
				</script>
		<?
				unset($_SESSION['add_param_error']);
			}
		?>
	</body>
</html>