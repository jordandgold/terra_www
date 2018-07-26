jQuery(document).ready(function($){

	$('[data-toggle=modal]').click(function() {
		var modalName = $(this).attr('data-target');
		$(modalName).toggleClass('open');
		$('body').toggleClass('modal-open');
		return false;
	});
	$('[data-close=modal]').click(function() {
		$(this).parent().parent().parent().toggleClass('open');
		$('body').toggleClass('modal-open');
	});

}); 