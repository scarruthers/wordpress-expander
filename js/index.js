$(document).ready(function(){
	// Expander Show / Hide
	$('.expander_container h5').first().on('click', function() {
		// Find our content div
		var content = $(this).siblings().first();

		// Swap +/- image
		if(content.hasClass('collapsed')) {
			content.removeClass('collapsed').addClass('expanded');
		} else {
			content.removeClass('expanded').addClass('collapsed');
		}

		// Toggle content div
		content.toggle(200);
	});

	// Add Button on Edit Page/Post Page
	$('#wp-content-media-buttons').append([
		"<a href='#' class='button expanderPopup' data-editor='content' title='Add Expander'>",
		"Add Expander",
		"</a>"
	].join('\n'));

	// Popup Management
	$(".expanderPopup").click(function(e) {
	    $("#expanderPopup").show().addClass("wait");
	});

	$(".popup, .close").click(function() {
	    $("#expanderPopup").hide();
	});

	$(".popup .container .nonclickable").click(function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	});
});


