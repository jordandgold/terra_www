jQuery(document).ready(function($){

	$('.markup-panel').each(function(){
		var markup = $(this).find('.markup-panel__example').html();
		var escapedMarkup = escapeHtml(markup);
		var trimMarkup = $.trim(markup);
		var html = Prism.highlight(trimMarkup, Prism.languages.html, 'html');
		$(this).find('.language-markup').html(html);
	});

	function escapeHtml(unsafe) {
	    return unsafe
	         .replace(/&/g, "&amp;")
	         .replace(/</g, "&lt;")
	         .replace(/>/g, "&gt;")
	         .replace(/"/g, "&quot;")
	         .replace(/'/g, "&#039;");
	}

});