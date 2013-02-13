jQuery(document).ready(function(){
	/*--------Front-End--------*/
	// Expand / Collapse Functionality
	$('.expander_container h5').on('click', function() {
		// Find our content div
		var parent = $(this).parent();
		
		// Swap +/- image
		if(parent.hasClass('collapsed')) {
			$(this).removeClass('collapsed').addClass('expanded');
		} else {
			$(this).removeClass('expanded').addClass('collapsed');
		}

		// Toggle content div
		parent.find('.expander_content').toggle(300);
	});
	
	$('.expander_container.collapsed .expander_content').toggle();

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
		// Reset popup fields
		$('#expander_title').val('');
		$('#expandercontent_ifr').contents().find('#tinymce').html('');
		$('#expander_auto_load').prop('checked', false);
	});
	
	// Upon clicking 'Insert Into Page', add the new content to the content editor
	$('.add_expander').on('click', function() {
		var title = $('#expander_title');
		var content = $('#expandercontent_ifr').contents().find('#tinymce');
		var auto_load = $('#expander_auto_load');
		var wysiwyg_div = $('#content_ifr').contents().find('#tinymce');
		
		// Make sure the user entered content
		if(title.val() != '' && content.html() != '') {
			var checked = auto_load.prop('checked');
			if(checked == true) {
				var css = 'expanded';
			} else {
				var css = 'collapsed';
			}
			var new_content = [
				"<div class='expander_container " + css + "'>",
				"<h5 class='expander_heading'>" + title.val() + "</h5>",
				"<div class='expander_content'>",
				content.html(),
				"</div>",
				"</div>"
			].join('\n');
			
			// Append new expander div
			wysiwyg_div.html(wysiwyg_div.html() + '\n' + new_content);
		}
		// Reset form fields
		title.val('');
		content.html('');
		auto_load.prop('checked', false);
		
		// Update WYSIWYG CSS
		wysiwyg_div.find('.expander_container').css('border', '1px dotted #000').css('height', '15px').css('padding', '5px 20px').css('margin-top', '5px');
		wysiwyg_div.find('.expander_container h5').css('margin', 0).css('cursor', 'pointer');
		wysiwyg_div.find('.expander_content').hide();
		
		// Close popup
		$(this).parents('#expander_popup').hide();
	});
});