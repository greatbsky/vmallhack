window.setInterval(function(){
	if(jQuery("#countdown").text() == "000000" && !jQuery("#countdown").data("click")) {
		jQuery(".honor-btn-go").click();
		jQuery("#countdown").data("click", true);
	}
}, 50);