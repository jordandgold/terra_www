/**
 * Terra Design System
 * treeMenu.js
 */

(function($, window, document){
  
	'use strict';

	$('.tree-menu__list li.is-expanded').find('ul').show();

    $('.tree-menu__list li.is-expandable > a').click(function () {
    	if ($(this).parent().hasClass('is-expanded')) {
    		$(this).next('ul').slideToggle(200).parent().toggleClass('is-expanded');
    	} else {
    		$(this).parent().siblings('.is-expanded').find('ul').slideToggle(200).parent().toggleClass('is-expanded');
    		$(this).next('ul').slideToggle(200).parent().toggleClass('is-expanded');
    	}
    });     

})(jQuery, window, document);