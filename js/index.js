$(document).ready(function(){
	/*--------Front-End--------*/
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

	/*--------Popup Management--------*/
	
	// Basic functionality
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
	
	// Re-enable checkbox functionality (popup's stopPropagation() and preventDefault() screws it up)
	$('.clickable').on('click', function(event) {
		$(this).prop('checked', !$(this).prop('checked'));
		event.stopPropagation();
	});

	
	// Close the popup
	$('#expander_form .close').on('click', function() {
		// Reset form fields
		$('#expander_title').val(' ');
		$('#expander_content').val(' ');
		$('#expander_auto_load').prop('checked', false);
	});
	
	// Upon clicking 'Insert Into Page', add the new content to the content editor
	$('.add_expander').on('click', function() {
		var wysiwyg_div = $('#content_ifr').contents().find('#tinymce');
		var regtext_div = $('#content');
		
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
		wysiwyg_div.html(wysiwyg_div.html() + new_content);
		regtext_div.html(regtext_div.html() + new_content);
		
		// Reset form fields
		$('#expander_title').val('');
		$('#expander_content').val('');
		$('#expander_auto_load').prop('checked', false);
		
		// Close popup
		$(this).parents('#expander_popup').hide();
	});
});


