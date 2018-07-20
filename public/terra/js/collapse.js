jQuery(document).ready(function($){

    $('.accordion__heading').click(function () {
    	// Collapse the sibling accordions if this has a group
		var maybeGroup = $(this).parent().parent();
    	if(maybeGroup && maybeGroup.hasClass('accordion-group')) {
    		$(this).parent().siblings('.accordion').removeClass('expanded');
    		// $(this).parent().siblings('.accordion').children('.accordion__content').slideUp();
    	}
    	// Adjust the one you clicked
    	$(this).parent().toggleClass('expanded');
    	// $(this).next('.accordion__content').slideDown();
    });

});