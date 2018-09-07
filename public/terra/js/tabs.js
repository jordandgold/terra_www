/**
 * Terra Design System
 * tabs.js
 */

(function($, window, document){

	'use strict';

	var tabItems = $('.ter-tabs__nav a');

	tabItems.on('click', function(event){

		event.preventDefault();

		var selectedItem = $(this);

		if( !selectedItem.hasClass('is-active') ) {

			var selectedTab = selectedItem.data('content'),
				tabScope = selectedItem.parent().parent().parent().data('controls'),
				tabContentWrapper = $(tabScope),
				selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
				slectedContentHeight = selectedContent.innerHeight();

				console.log(tabScope);
			
			$('[data-controls="'+tabScope+'"]').find('a[data-content]').parent().removeClass('is-active');
			selectedItem.parent().addClass('is-active');
			selectedContent.addClass('is-active').siblings('li').removeClass('is-active');

			tabContentWrapper.animate({
				'height': slectedContentHeight
			}, 200);
		}
	});

})(jQuery, window, document);