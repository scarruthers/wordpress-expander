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
		"<a href='#' class='button expander_popup' data-editor='content' title='Add Expander'>",
		"Add Expander",
		"</a>"
	].join('\n'));

	// Popup Management
	$('.expander_popup').click(function(e) {
	    $('#expander_popup').show().addClass('wait');
	});

	$('.popup, .close').click(function() {
	    $('#expander_popup').hide();
	});

	$('.popup .container .nonclickable').click(function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	});
	
	$('#expander_form .close').on('click', function() {
		// Reset form fields
		$('#expander_title').val(' ');
		$('#expander_content').val(' ');
		$('#expander_auto_load').prop('checked', false);
	});
	
	$('.clickable').on('click', function(event) {
		$(this).prop('checked', !$(this).prop('checked'));
		event.stopPropagation();
	});
	
	// Add Expander to Post/Page Content
	$('.add_expander').on('click', function() {
		var content_div = $('#content_ifr').contents().find('#tinymce');
		var checked = $('#expander_auto_load').prop('checked');
		if(checked == true) {
			var css = 'auto_load';
		} else {
			var css = '';
		}
		var new_content = [
			"<div class='expander_container " + css + "'>",
			"<h5>" + $('#expander_title').val() + "</h5>",
			"<div class='expander_content'>",
			$('#expander_content').val(),
			"</div>",
			"</div>"
		].join('\n');
		
		// Append new expander div
		content_div.html(content_div.html() + new_content);
		
		// Reset form fields
		$('#expander_title').val('');
		$('#expander_content').val('');
		$('#expander_auto_load').prop('checked', false);
		
		// Close popup
		$(this).parents('#expander_popup').hide();
	});
});


