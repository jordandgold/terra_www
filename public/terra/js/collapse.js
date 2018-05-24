$(document).ready(function(){

    $('a.collapse').click(function () {
    	$(this).parent().children('.collapsed').slideToggle(200).parent().toggleClass('expanded').toggleClass('collapsed');
    });
          
});