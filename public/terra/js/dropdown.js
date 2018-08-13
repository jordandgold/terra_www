/**
 * Terra Design System
 * dropdown.js
 */

(function($, window, document){
  
  	'use strict';
  
  	var $html = $('html');
  
  	$html.on('click', '.ter-dropdown', function(e) {
		e.preventDefault();
		if($(this).hasClass('is-open')) {
		  	$(this).removeClass('is-open');
		  	$('.ter-dropdown').removeClass('is-open');
	  	} else {
		  	$('.ter-dropdown').removeClass('is-open');
		  	$(this).toggleClass('is-open');
	  	}
	});

	$html.on('click', '.ter-dropdown__item a', function(e) {
		e.preventDefault();
		window.location = this.href;
	});
  
	$html.on('click', function(e) {
		var $target = $(e.target);
		if (!$target.parents().hasClass('ter-dropdown')) {
			$('.ter-dropdown').removeClass('is-open');
		}
	});
  
})(jQuery, window, document);