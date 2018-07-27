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
	$('.modal--full-page').click(function() {
		$(this).toggleClass('open');
		$('body').toggleClass('modal-open');
	}).children().click(function(e) {
	  return false;
	});

}); 