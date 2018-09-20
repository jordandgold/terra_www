/**
 * Terra Design System
 * navigation.js
 */

(function($, window, document){
  
	'use strict';

	var navBar = $('nav.ter-navbar'),
		navBarAutoHide = $('nav.ter-navbar.js-auto-hide'),
		navBarHeight = navBar.height(),
		secondaryNav = $('nav.ter-secondary-navbar');

	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 20,
		scrollOffset = 200;

	navBar.on('click', '.ter-navbar__toggle', function(e){
		e.preventDefault();
		// navBar.toggleClass('is-open');
		$('body').toggleClass('has-open-nav');
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

		if(secondaryNav.length) {
			showSecondaryNavBar();
		}

	});

	$(window).on('resize', function(){
		navBarHeight = navBar.height();
	});

	// mobile solution for mega menu
	var $html = $('html');
  
  	$html.on('click', '.ter-mega-menu__trigger', function(e) {
		e.preventDefault();
		if($(this).next('.ter-mega-menu').hasClass('is-open')) {
		  	$(this).next('.ter-mega-menu').removeClass('is-open');
	  	} else {
		  	$(this).next('.ter-mega-menu').toggleClass('is-open');
	  	}
	});

	function hideNavBar() {

		var currentTop = $(window).scrollTop();

		if (previousTop - currentTop > scrollDelta && !secondaryNav.length) {
	    	// scrolling up
	    	navBarAutoHide.removeClass('is-hidden');
	    } else if (currentTop < scrollOffset && secondaryNav.length) {
	    	// scrolling up
	    	navBarAutoHide.removeClass('is-hidden');
	    } else if ( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	// scrolling down
	    	navBarAutoHide.addClass('is-hidden');
	    	navBarAutoHide.find('.ter-navbar__nav').find('.ter-dropdown.is-open').each(function(){
	    		$(this).removeClass('is-open');
	    	});
	    }

	   	previousTop = currentTop;
		scrolling = false;
	}

	function showSecondaryNavBar() {

		var currentTop = $(window).scrollTop(),
			trigger = secondaryNav.data('trigger'),
			triggerTop = $(trigger).offset().top;

		if (currentTop > triggerTop) {
			secondaryNav.addClass('is-shown');
		} else {
			secondaryNav.removeClass('is-shown');
		}

	}

})(jQuery, window, document);