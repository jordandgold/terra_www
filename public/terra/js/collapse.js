jQuery(document).ready(function($){

    $('.collapse').click(function () {
    	$(this).parent().children('.collapsed').slideToggle(200).parent().toggleClass('expanded').toggleClass('collapsed');
    });

    $('.navbar__toggle').click(function () {
    	$(this).parent().children('.navbar__nav--collapse').slideToggle(200).parent().toggleClass('expanded').toggleClass('collapsed');
    });
          
});