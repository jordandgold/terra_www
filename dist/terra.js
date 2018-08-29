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
	})
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

	var mainHeader = $('nav.navbar:not(.stay-put)'),
		headerHeight = mainHeader.height(),
		navToggle = $('.navbar__toggle');
	
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	mainHeader.on('click', '.nav-trigger', function(e){
		e.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	navToggle.click(function () {
    	$(this).toggleClass('is-active');
    	$(this).parent().children('.navbar__nav').slideToggle().toggleClass('is-expanded');
    });

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    	//close dropdowns
	    	mainHeader.find('.navbar__nav').find('.dropdown.open').each(function(){
	    		$(this).removeClass('open');
	    	});
	    }
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		
		if (previousTop >= currentTop ) {
	    	//if scrolling up... 
	    	if( currentTop < secondaryNavOffsetTop ) {
	    		//secondary nav is not fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('fixed slide-up');
	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
	    	} else if( previousTop - currentTop > scrollDelta ) {
	    		//secondary nav is fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}
	    	
	    } else {
	    	//if scrolling down...	
	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 	  		//hide primary nav
	    		mainHeader.addClass('is-hidden');
	    		secondaryNavigation.addClass('fixed slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	} else if( currentTop > secondaryNavOffsetTop ) {
	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}

	    }
	}

})(jQuery, window, document);
/**
 * Terra Design System
 * select.js
 */

(function($, window, document){
  
  'use strict';

	$('select:not([multiple])').each(function(){
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
    	if ($this.hasClass('search')) {

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

	$('select[multiple]').each(function(){
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
    	if ($this.hasClass('search')) {

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