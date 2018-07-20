jQuery(document).ready(function($){

	$('.trigger').click(function() {
		$('.modal--full-page').toggleClass('open');
		$('body').toggleClass('modal-open');
		return false;
	});
	$('.modal__close').click(function() {
		$(this).parent().parent().parent().toggleClass('open');
		$('body').toggleClass('modal-open');
	});

}); 