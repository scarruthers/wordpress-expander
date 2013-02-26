(function($){
	$(window).load(function() {
		// Establish some basic variables
		var popup = $('#expander_popup');
		var p_title = $('#expander_title');
		var p_content = $('#expandercontent_ifr').contents().find('#tinymce');
		var p_auto_load = $('#expander_auto_load');
		var wysiwyg_div = $('#content_ifr').contents().find('#tinymce');

		var controls = [
			"<span class='controls'>",
				"<a href='#' class='move_up'>Move Up</a> ",
				"<a href='#' class='move_down'>Move Down</a> ",
				"<a href='#' class='delete_exp'>Delete</a>",
			"</span>",
		].join('\n');

		// Updates the main wysiwyg editor to correctly display expanders
		function updateEditor() {
			// Insert controls
			wysiwyg_div.find('.expander_heading').each(function() {
				if(!$(this).next().hasClass('controls')) {
					$(controls).insertAfter($(this));
				}
			});

			// Update styles
			wysiwyg_div.find('.expander_container').css('border', '1px dotted #000').css('height', '15px').css('padding', '5px 20px 5px 20px').css('margin-top', '5px');
			wysiwyg_div.find('.expander_container h5').css('margin', 0).css('cursor', 'pointer').css('float', 'left');
			wysiwyg_div.find('.expander_container').disableSelection();
			wysiwyg_div.find('.expander_content').css('width', '1px').css('height', '1px').hide();
			wysiwyg_div.find('.controls').css('float', 'right').css('clear', 'right').css('display', 'inline');
			wysiwyg_div.find('.controls a').css('cursor', 'pointer');

			wysiwyg_div.find('.expander_container h5').on('click', function() {
				// Show popup
				popup.show();

				// Populate popup with content
				p_title.val($(this).html());
				p_content.html($(this).next().next().html());
				p_auto_load.prop('checked', $(this).parent().hasClass('expanded'));
				$(this).parent().remove();
			});

			wysiwyg_div.find('.move_up').on('click', function() {
				var parent = $(this).parents('.expander_container');
				parent.insertBefore(parent.prev());
			});
			wysiwyg_div.find('.move_down').on('click', function() {
				var parent = $(this).parents('.expander_container');
				parent.insertAfter(parent.next());
			});

			wysiwyg_div.find('.delete_exp').on('click', function() {
				if(confirm('Are you sure you want to delete this expander?')) {
					$(this).parents('.expander_container').remove();
				}
			});
		}

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
		    popup.show().addClass('wait');
		});

		$('.popup, .close').click(function() {
		    popup.hide();
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
			p_title.val('');
			p_content.html('');
			p_auto_load.prop('checked', false);
		});

		// Bind a handler to the 'Update' button to remove certain parts of the expanders
		$('#publish').on('click', function(event) {
			wysiwyg_div.find('.controls').remove();
			wysiwyg_div.find('.expander_container, .expander_heading, .expander_content').removeAttr('style').removeAttr('data-mce-style');
			console.log('Controls and styles removed.');
		});

		// Upon clicking 'Insert Into Page', add the new content to the content editor
		$('.add_expander').on('click', function() {
			// Make sure the user entered content
			if(p_title.val() != '' && p_content.html() != '') {
				var checked = p_auto_load.prop('checked');
				if(checked == true) {
					var css = 'expanded';
				} else {
					var css = 'collapsed';
				}
				var new_content = [
					"<div class='expander_container " + css + "'>",
					"<h5 class='expander_heading'>" + p_title.val() + "</h5>",
					"<div class='expander_content'>",
					p_content.html(),
					"</div></div>"
				].join('\n').trim();

				// Append new expander div
				tinyMCE.get('content').execCommand('mceInsertContent', false, new_content);
			}

			// Reset form fields
			p_title.val('');
			p_content.html('');
			p_auto_load.prop('checked', false);

			// Close popup, update editor contents
			popup.hide();
			updateEditor();
		});

		// Reload the popup tinymce editor
		//tinyMCE.get('expandercontent').execCommand("mceRepaint");
		//wysiwyg_div.attr('autocomplete', 'off').width(wyiwyg_div.width() + 10);

		// jQuery(".mceEditor .mceLayout").each(function(i,ele){
		//      jQuery("#"+ele.id).css('width',jQuery("#"+ele.id).width()+10)
		//  });

		// We are on the backend, automatically run post editor updates
		if(window.location.pathname.indexOf("wp-admin") !== -1) {
			updateEditor();
		}
	})
})(jQuery);