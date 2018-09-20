/**
 * Terra Design System
 * tooltip.js
 */

 (function($, window, document){
	
	'use strict';

	var tooltips = $('.ter-tooltip'),
		target,
		tooltip,
		tooltipArrow;

	tooltips.bind('mouseenter', function() {

		target  = $(this);
        tooltip = target.children('.ter-tooltip__content');

		var initTooltip = function() {

			var pos_top  = tooltip.offset().top,
				pos_left = tooltip.offset().left,
	            pos_bottom = tooltip.offset().bottom,
	            pos_right = ($(window).width() - (tooltip.offset().left + tooltip.outerWidth()));
	 
	        if (pos_left < 0) {
	            tooltip.addClass('bump-left');
	        }

	        if (pos_right < 0) {
	            tooltip.addClass('bump-right');
	        }

		}

		initTooltip();
    	$(window).resize(initTooltip);

	});
	
})(jQuery, window, document);