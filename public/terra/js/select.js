/**
 * Terra Design System
 * select.js
 */

(function($, window, document){
  
	'use strict';

	$('select.ter-select:not([multiple])').each(function(){
	    var $this = $(this),
	    	numberOfOptions = $(this).children('option').length,
    		dropDirection = $(this).attr('direction');
	  
	    $this.addClass('select-hidden'); 
	    $this.wrap('<div class="select"></div>');
	    $this.after('<div class="select-styled"></div>');

	    var $styledSelect = $this.next('div.select-styled');
	    $styledSelect.text($this.children('option').eq(0).text());
	  
	    var $list = $('<ul />', {
	        'class': 'select-options drop-' + dropDirection
    	}).insertAfter($styledSelect);

	    // add search functionality
    	if ($this.hasClass('has-search')) {

			var $searchFilter = $('<div />', {
		        'class': 'select-options__search-filter'
	    	}).appendTo($list);

			var $searchFilterInput = $('<input />', {
		        'class': 'select-options__search-filter-input',
		        'type': 'text',
		        'placeholder': 'search'
	    	}).appendTo($searchFilter);

	    	$list.append('<div rel="hide" class="select-options__no-results">No results found</div>');

	    	// keyup search functionality
	    	$searchFilterInput.on('keyup', function(event){

	    		event.preventDefault(event);

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
	  	
	  	// open the select
	    $styledSelect.click(function(event) {
	        event.stopPropagation();

	        // hide all other selects
	        $('div.select-styled.active').not(this).each(function(){
	            $(this).removeClass('active').next('ul.select-options').toggleClass('is-open');
	        });

	        // open selected select
	        $(this).toggleClass('active').next('ul.select-options').toggleClass('is-open');
	        setTimeout(function() {
	        	$(this).next('.select-options').find('input.select-options__search-filter-input').focus();
	        }, 3000);
	    });
	  
		// select an option
	    $listItems.click(function(event) {
	        event.stopPropagation();

	        var rel = $(this).attr('rel');

	        // replace text with selected option
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val(rel).trigger('has-changed');
	        $list.removeClass('is-open');

	        $this.val(rel).change();
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
	        // $this.find('option[text="' + rel + '"]').attr('selected', true);
	        // var optionValue = $this.children('option').filter(function () { return $(this).html() == rel; }).val();
	        // $this.val(optionValue).change();
	        $this.val(rel).change();
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