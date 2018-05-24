$(document).ready(function(){

    $('.tree-menu li.expandable > a').click(function () {
    	// $(this).parent().parent().find('li.expanded > ul').slideToggle(200).parent().toggleClass('expanded');
    	$(this).parent().children('ul').slideToggle(200).parent().toggleClass('expanded');
    });
          
});