jQuery(document).ready(function($){

	// function filterFunction() {
	//   var input, filter, ul, li, a, i;
	//   input = $('input#search-filter');
	//   filter = input.value.toUpperCase();
	//   div = $(".dropdown-search__results");
	//   a = div.getElementsByTagName("a");
	//   for (i = 0; i < a.length; i++) {
	//     if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
	//       a[i].style.display = "";
	//     } else {
	//       a[i].style.display = "none";
	//     }
	//   }
	// }

	$('select').each(function(){
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
    		var searchFilterMarkup = '<div class="search-filter"><input type="text" id="searchFilter" placeholder="search" /></div>',
    			searchFilter = 'div.search-filter input';
	    	$list.append(searchFilterMarkup);
	    	$list.append('<div rel="hide" class="no-results">No results found</div>');
	    	$(searchFilter).on('keyup', function(){
	    		var options = $('.select-options').children('li:not([rel="hide"])'),
	    			filter = $(this).val().toUpperCase();
				for (i = 0; i < options.length; i++) {

					// count results
					var resultsCount = $('.select-options').children('li:not([rel="hide"]):visible').length;

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
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').toggleClass('show');
        });
        $(this).toggleClass('active').next('ul.select-options').toggleClass('show');
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.removeClass('show');
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.removeClass('show');
    });

    $(searchFilter).click(function(event){
	    event.stopPropagation();
	});

});

});