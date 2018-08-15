/**
 * Terra Design System
 * modal.js
 */

(function($, window, document){
  
	'use strict';

	$('[data-toggle=modal]').click(function() {
		var modalName = $(this).attr('data-target');
		$(modalName).toggleClass('is-open');
		$('body').toggleClass('has-modal-open');
		return false;
	});
	$('[data-close=modal]').click(function() {
		$(this).parent().parent().parent().toggleClass('is-open');
		$('body').toggleClass('has-modal-open');
	});
	$('.ter-modal--full-page').click(function() {
		$(this).toggleClass('is-open');
		$('body').toggleClass('has-modal-open');
	}).children().click(function(e) {
	  return false;
	});

})(jQuery, window, document);