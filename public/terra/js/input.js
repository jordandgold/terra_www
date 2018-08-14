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