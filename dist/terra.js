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
/**
 * Terra Design System
 * collapse.js
 */

(function($, window, document){

    'use strict';
    
    // open all accordions
    $('.ter-accordion.is-expanded').children('.ter-accordion__content').show();

    $('[data-toggle="collapse"]').click(function () {

        // accordions
        if ($(this).parent().hasClass('ter-accordion')) {
            // Collapse the sibling accordions if this has a group
            var maybeGroup = $(this).parent().parent();
            if(maybeGroup && maybeGroup.hasClass('ter-accordion-group')) {
                $(this).parent().siblings('.ter-accordion').removeClass('is-expanded');
                $(this).parent().siblings('.ter-accordion').find('.ter-accordion__content').slideUp(200);
            }
            // Adjust the one you clicked
            $(this).parent().toggleClass('is-expanded');
            $(this).next('.ter-accordion__content').slideToggle(200);
        }
        // all other collapse instances
        else {

            var targetName = $(this).attr('data-target');
            $(targetName).slideToggle().toggleClass('is-open');

        }

    });

})(jQuery, window, document);
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
/**
 * Terra Design System
 * input.js
 */

(function($, window, document){
	
	'use strict';
	
	$(".input-group input").focusout(function(){
		if($(this).val() != ""){
			$(this).addClass("has-content");
		}else{
			$(this).removeClass("has-content");
		}
	});
	
});
/**
 * Terra Design System
 * modal.js
 */

(function($, window, document){
  
	'use strict';

	$('[data-toggle=modal]').click(function() {
		var modalName = $(this).attr('data-target');
		$(modalName).toggleClass('is-open');
		$('body').toggleClass('has-modal-open');
		return false;
	});
	$('[data-close=modal]').click(function() {
		$(this).parent().parent().parent().toggleClass('is-open');
		$('body').toggleClass('has-modal-open');
	});
	$('.ter-modal--full-page').click(function() {
		$(this).toggleClass('is-open');
		$('body').toggleClass('has-modal-open');
	}).children().click(function(e) {
	  return false;
	});

})(jQuery, window, document);
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
/**
 * Terra Design System
 * select.js
 */

(function($, window, document){
  
  'use strict';

	$('select.ter-select:not([multiple])').each(function(){
	    var $this = $(this), numberOfOptions = $(this).children('option').length;
	  
	    $this.addClass('select-hidden'); 
	    $this.wrap('<div class="select"></div>');
	    $this.after('<div class="select-styled"></div>');

	    var $styledSelect = $this.next('div.select-styled');
	    $styledSelect.text($this.children('option').eq(0).text());
	  
	    var $list = $('<ul />', {
	        'class': 'select-options'
    	}).insertAfter($styledSelect);

	    // add search functionality
    	if ($this.hasClass('has-search')) {

			var $searchFilter = $('<div />', {
		        'class': 'select-options__search-filter'
	    	}).appendTo($list);

			var $searchFilterInput = $('<input />', {
		        'id': 'searchFilter',
		        'type': 'text',
		        'placeholder': 'search'
	    	}).appendTo($searchFilter);

	    	$list.append('<div rel="hide" class="select-options__no-results">No results found</div>');

	    	// keyup search functionality
	    	$searchFilterInput.on('keyup', function(e){

	    		e.preventDefault();

	    		var options = $list.find('.select-options__wrap').children('li:not([rel="hide"])'),
	    			filter = $(this).val().toUpperCase();

				for (i = 0; i < options.length; i++) {

					// count results
					var resultsCount = $list.find('.select-options__wrap').children('li:not([rel="hide"]):visible').length;

					// check if any matching results
					if (options[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
						options[i].style.display = "";
					} else {
						options[i].style.display = "none";
					}

					// display no results
					if (resultsCount == 0) {
						$list.find('.select-options__no-results').show();
					} else {
						$list.find('.select-options__no-results').hide();
					}
				}

			});
	    }

	    var $optionsWrap = $('<div />', {
	        'class': 'select-options__wrap'
		}).appendTo($list);
	  
	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	        	class: 'select-options__item',
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($optionsWrap);
	    }
	  
	    var $listItems = $list.children('.select-options__wrap').children('li');
	  
	    $styledSelect.click(function(e) {
	        e.stopPropagation();
	        $('div.select-styled.active').not(this).each(function(){
	            $(this).removeClass('active').next('ul.select-options').toggleClass('is-open');
	        });
	        $(this).toggleClass('active').next('ul.select-options').toggleClass('is-open');
	    });
	  
		//
	    $listItems.click(function(e) {
	        e.stopPropagation();
	        // replace text with selected option
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val($(this).attr('rel'));
	        $list.removeClass('is-open');
	        console.log($this.val());
	    });
	  	
		// hide dropdown when you click out
	    $(document).click(function() {
	        $styledSelect.removeClass('active');
	        $list.removeClass('is-open');
	    });

		// don't close the select if a user focuses on the search
	    $($searchFilterInput).click(function(event){
		    event.stopPropagation();
		});

	});

	$('select.ter-select[multiple]').each(function(){
	    var $this = $(this), numberOfOptions = $(this).children('option').length;
	  
	    $this.addClass('select-hidden'); 
	    $this.wrap('<div class="select"></div>');
	    $this.after('<div class="select-styled"></div>');

	    var $styledSelect = $this.next('div.select-styled');
	    $styledSelect.html('<span class="label">' + $this.children('option').eq(0).text() + '</div>');
	  
	    var $list = $('<ul />', {
	        'class': 'select-options'
    	}).insertAfter($styledSelect);

	    // add search functionality
    	if ($this.hasClass('has-search')) {

			var $searchFilter = $('<div />', {
		        'class': 'select-options__search-filter'
	    	}).appendTo($list);

			var $searchFilterInput = $('<input />', {
		        'id': 'searchFilter',
		        'type': 'text',
		        'placeholder': 'search'
	    	}).appendTo($searchFilter);

			// render no results
	    	$list.append('<div rel="hide" class="select-options__no-results">No results found</div>');

	    	// keyup search functionality
	    	$searchFilterInput.on('keyup', function(e){

	    		e.preventDefault();

	    		var options = $list.find('.select-options__wrap').children('li:not([rel="hide"])'),
	    			filter = $(this).val().toUpperCase();

				for (i = 0; i < options.length; i++) {

					// count results
					var resultsCount = $list.find('.select-options__wrap').children('li:not([rel="hide"]):visible').length;

					// check if any matching results
					if (options[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
						options[i].style.display = "";
					} else {
						options[i].style.display = "none";
					}

					// display no results
					if (resultsCount == 0) {
						$list.find('.select-options__no-results').show();
					} else {
						$list.find('.select-options__no-results').hide();
					}
				}

			});
	    }

	    var $optionsWrap = $('<div />', {
	        'class': 'select-options__wrap'
		}).appendTo($list);
	  
	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	        	class: 'select-options__item',
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($optionsWrap);
	    }
	  
	    var $listItems = $list.children('.select-options__wrap').children('li');
	  
	    $styledSelect.click(function(event) {
	        event.stopPropagation();
	        $('div.select-styled.active').not(this).each(function(){
	            $(this).removeClass('active').next('ul.select-options').toggleClass('is-open');
	        });
	        $(this).toggleClass('active').next('ul.select-options').toggleClass('is-open');
	    });

	    $listItems.click(function(event) {

	        event.stopPropagation();

	        // replace text with selected option
	        $(this).hide();
	        $styledSelect.find('span.label').hide();

	        // add value to styled select
	        $styledSelect.append('<span class="badge badge--light option" data-rel="' + $(this).attr('rel') + '">' + $(this).text() + '<button type="button" class="badge__close" aria-label="Remove Option"><span aria-hidden="true">Remove Option</span></button></span>');
	        var rel = $(this).attr('rel');

	        // select corresponding value
	        $this.find('option[value="' + rel + '"]').attr('selected', true);
	    });

	    // prevent dropdown from closing
	    $styledSelect.on('click', '.option', function(event){
	    	event.stopPropagation();
	    });

	    // close options
	    $styledSelect.on('click', '.option button', function(event){
	    	event.stopPropagation();
	    	var rel = $(this).parent().attr('data-rel');
	    	$listItems.next('li[rel="' + rel + '"]').show();
	    	$this.find('option[value="' + rel + '"]').attr('selected', false);
			$(this).parent().remove();
			if (!$styledSelect.find('.option').length) {
	    		$styledSelect.find('.label').show();
	    	}
		});
	  	
		// hide dropdown when you click out
	    $(document).click(function() {
	        $styledSelect.removeClass('active');
	        $list.removeClass('is-open');
	    });

		// don't close the select if a user focuses on the search
	    $($searchFilterInput).click(function(event){
		    event.stopPropagation();
		});

	});

})(jQuery, window, document);
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
			
			$('[data-controls="'+tabScope+'"]').find('a[data-content]').parent().removeClass('is-active');
			selectedItem.parent().addClass('is-active');
			selectedContent.addClass('is-active').siblings('li').removeClass('is-active');

			tabContentWrapper.animate({
				'height': slectedContentHeight
			}, 200);
		}
	});

})(jQuery, window, document);
/**
 * Terra Design System
 * terra.js
 */

(function($, window, document){
  
	'use strict';

	$(window).on('load', function(){
		$('body').removeClass('preload');
	});

})(jQuery, window, document);
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
/**
 * Terra Design System
 * treeMenu.js
 */

(function($, window, document){
  
	'use strict';

	$('.ter-tree-menu__list li.is-expanded').find('ul').show();

    $('.ter-tree-menu__list li.is-expandable > a').click(function () {
    	if ($(this).parent().hasClass('is-expanded')) {
    		$(this).next('ul').slideToggle(200).parent().toggleClass('is-expanded');
    	} else {
    		$(this).parent().siblings('.is-expanded').find('ul').slideToggle(200).parent().toggleClass('is-expanded');
    		$(this).next('ul').slideToggle(200).parent().toggleClass('is-expanded');
    	}
    });     

})(jQuery, window, document);