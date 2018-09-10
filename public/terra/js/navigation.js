/**
 * Terra Design System
 * navigation.js
 */

(function($, window, document){
  
	'use strict';

	var navBar = $('nav.ter-navbar'),
		navBarAutoHide = $('nav.ter-navbar.js-auto-hide'),
		navBarHeight = navBar.height(),
		secondaryNav = $('nav.ter-secondary-nav');

	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	navBar.on('click', '.ter-navbar__toggle', function(e){
		e.preventDefault();
		navBar.toggleClass('is-open');
		$(this).toggleClass('is-active');
    	$(this).parent().children('.ter-navbar__nav').slideToggle().toggleClass('is-expanded');
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
	    	// scrolling up
	    	navBarAutoHide.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	// scrolling down
	    	navBarAutoHide.addClass('is-hidden');
	    	navBarAutoHide.find('.ter-navbar__nav').find('.ter-dropdown.is-open').each(function(){
	    		$(this).removeClass('is-open');
	    	});
	    }

	   	previousTop = currentTop;
		scrolling = false;
	}

})(jQuery, window, document);