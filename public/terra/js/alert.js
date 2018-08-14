/**
 * Terra Design System
 * alert.js
 */

(function($, window, document){

	'use strict';

	$('[data-close=alert]').click(function() {
		$(this).parent().toggle();
	});

})(jQuery, window, document);