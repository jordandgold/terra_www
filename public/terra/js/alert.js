/**
 * Terra Design System
 * alert.js
 */

(function($, window, document){

	'use strict';

	$('body').on('click', '[data-close=alert]', function() {
		$(this).parent().toggle();
	});

})(jQuery, window, document);