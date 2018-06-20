jQuery(document).ready(function($){

    $('.accordion__heading').click(function () {
    	/* Collapse the sibling accordions if this has a group */
		var maybeGroup = $(this).parent().parent();
    	if(maybeGroup && maybeGroup.hasClass('accordion-group')) {
    		$(this).parent().siblings('.accordion').removeClass('expanded');
    	}

    	/* Adjust the one you clicked */
    	$(this).parent().toggleClass('expanded');
    });
          
});