jQuery(document).ready(function($){

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

    		// var searchFilterMarkup = '<div class="search-filter"><input type="text" id="searchFilter" placeholder="search" /></div>',
    		// 	searchFilter = 'div.search-filter input';

			var $searchFilter = $('<div />', {
		        'class': 'search-filter'
	    	}).appendTo($list);

			var $searchFilterInput = $('<input />', {
		        'id': 'searchFilter',
		        'type': 'text',
		        'placeholder': 'search'
	    	}).appendTo($searchFilter);

	    	$list.append('<div rel="hide" class="no-results">No results found</div>');

	    	$searchFilterInput.on('keyup', function(){
	    		var options = $('.select-options-wrap').children('li:not([rel="hide"])'),
	    			filter = $(this).val().toUpperCase();
				for (i = 0; i < options.length; i++) {

					// count results
					var resultsCount = $('.select-options-wrap').children('li:not([rel="hide"]):visible').length;

					// check if any matching results
					if (options[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
						options[i].style.display = "";
					} else {
						options[i].style.display = "none";
					}

					// display no results
					if (resultsCount == 0) {
						$('.no-results').show();
					} else {
						$('.no-results').hide();
					}
				}
			});
	    }

	    var $optionsWrap = $('<div />', {
	        'class': 'select-options-wrap'
		}).appendTo($list);
	  
	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($optionsWrap);
	    }
	  
	    var $listItems = $list.children('.select-options-wrap').children('li');
	  
	    $styledSelect.click(function(e) {
	        e.stopPropagation();
	        $('div.select-styled.active').not(this).each(function(){
	            $(this).removeClass('active').next('ul.select-options').toggleClass('show');
	        });
	        $(this).toggleClass('active').next('ul.select-options').toggleClass('show');
	    });
	  
		//
	    $listItems.click(function(e) {
	        e.stopPropagation();
	        // replace text with selected option
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val($(this).attr('rel'));
	        $list.removeClass('show');
	        console.log($this.val());
	    });
	  	
		// hide dropdown when you click out
	    $(document).click(function() {
	        $styledSelect.removeClass('active');
	        $list.removeClass('show');
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

    		// var searchFilterMarkup = '<div class="search-filter"><input type="text" id="searchFilter" placeholder="search" /></div>',
    		// 	searchFilter = 'div.search-filter input';

			var $searchFilter = $('<div />', {
		        'class': 'search-filter'
	    	}).appendTo($list);

			var $searchFilterInput = $('<input />', {
		        'id': 'searchFilter',
		        'type': 'text',
		        'placeholder': 'search'
	    	}).appendTo($searchFilter);

			// render no results
	    	$list.append('<div rel="hide" class="no-results">No results found</div>');

	    	// keyup search functionality
	    	$searchFilterInput.on('keyup', function(){
	    		var options = $('.select-options-wrap').children('li:not([rel="hide"])'),
	    			filter = $(this).val().toUpperCase();
				for (i = 0; i < options.length; i++) {

					// count results
					var resultsCount = $('.select-options-wrap').children('li:not([rel="hide"]):visible').length;

					// check if any matching results
					if (options[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
						options[i].style.display = "";
					} else {
						options[i].style.display = "none";
					}

					// display no results
					if (resultsCount == 0) {
						$('.no-results').show();
					} else {
						$('.no-results').hide();
					}
				}
			});
	    }

	    var $optionsWrap = $('<div />', {
	        'class': 'select-options-wrap'
		}).appendTo($list);
	  
	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($optionsWrap);
	    }
	  
	    var $listItems = $list.children('.select-options-wrap').children('li');
	  
	    $styledSelect.click(function(event) {
	        event.stopPropagation();
	        $('div.select-styled.active').not(this).each(function(){
	            $(this).removeClass('active').next('ul.select-options').toggleClass('show');
	        });
	        $(this).toggleClass('active').next('ul.select-options').toggleClass('show');
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
	        $list.removeClass('show');
	    });

		// don't close the select if a user focuses on the search
	    $($searchFilterInput).click(function(event){
		    event.stopPropagation();
		});

	});

});