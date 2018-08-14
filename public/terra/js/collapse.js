/**
 * Terra Design System
 * collapse.js
 */

(function($, window, document){

    'use strict';

    $('.ter-accordion.is-expanded').children('.ter-accordion__content').show();

    $('[data-toggle="collapse"]').click(function () {
    	// Collapse the sibling accordions if this has a group
		var maybeGroup = $(this).parent().parent();
    	if(maybeGroup && maybeGroup.hasClass('ter-accordion-group')) {
    		$(this).parent().siblings('.ter-accordion').removeClass('is-expanded');
    		$(this).parent().siblings('.ter-accordion').find('.ter-accordion__content').slideUp(200);
    	}
    	// Adjust the one you clicked
    	$(this).parent().toggleClass('is-expanded');
    	$(this).next('.ter-accordion__content').slideToggle(200);
    });

});