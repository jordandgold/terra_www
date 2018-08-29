/**
 * Terra Design System
 * navigation.js
 */

(function($, window, document){
  
	'use strict';

	var navBar = $('nav.navbar.js-auto-hide'),
		navBarHeight = navBar.height();

	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	navBar.on('click', '.navbar__toggle', function(e){
		e.preventDefault();
		navBar.toggleClass('is-open');
		$(this).toggleClass('is-active');
    	$(this).parent().children('.navbar__nav').slideToggle().toggleClass('is-expanded');
	});

	$(window).on('scroll', function(){

		if(!scrolling) {

			scrolling = true;

			(!window.requestAnimationFrame)
				? setTimeout(hideNavBar, 250)
				: requestAnimationFrame(hideNavBar);

		}

	});

	$(window).on('resize', function(){
		navBarHeight = navBar.height();
	});

	function hideNavBar() {

		var currentTop = $(window).scrollTop();

		if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up
	    	navBar.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down
	    	navBar.addClass('is-hidden');
	    }

	   	previousTop = currentTop;
		scrolling = false;
	}

})(jQuery, window, document);