(function($){
    $.fn.disableSelection = function() {
        return this.each(function() {
            $(this).attr('unselectable', 'on')
            .css({
                '-moz-user-select':'none',
                '-o-user-select':'none',
                '-khtml-user-select':'none',
                '-webkit-user-select':'none',
                '-ms-user-select':'none',
                'user-select':'none'
            })
            .each(function() {
                $(this).attr('unselectable','on')
                .bind('selectstart',function(){
                    return false;
                });
            })
            .bind('dblclick', function(event) {
				if (!event) event = window.event;
				event.preventDefault();
				event.stopPropagation();
				return false;
			})
			.bind('keypress', function(event) {
				event.preventDefault();
				event.stopPropagation();
				return false;
			});
        });
    }
})(jQuery);

(function($){
	$(window).load(function() {
		// Establish some basic variables
		var popup = $('#expander_popup');
		var p_title = $('#expander_title');
		var p_content = $('#expandercontent_ifr').contents().find('#tinymce');
		var p_auto_load = $('#expander_auto_load');
		var wysiwyg_div = $('#content_ifr').contents().find('#tinymce');
		var edited_element = null;

		var controls = [
			"<span class='controls'>",
				"<a href='#' class='move_up' style='cursor:pointer'><img src='../wp-content/plugins/wordpress-expander/images/expander-up.png' border='0' style='cursor:pointer' /></a> ",
				"<a href='#' class='move_down'><img src='../wp-content/plugins/wordpress-expander/images/expander-down.png' border='0' style='cursor:pointer' /></a> ",
				"<a href='#' class='delete_exp'><img src='../wp-content/plugins/wordpress-expander/images/expander-trash.png' border='0' style='cursor:pointer' /></a>",
			"</span>",
		].join('\n');

		// Updates the main wysiwyg editor to correctly display expanders
		function updateEditor() {
			// Insert controls
			wysiwyg_div.find('.expander_heading').each(function() {
				if(!$(this).parent('.expander_container').has('.controls')) {
					$(controls).insertAfter($(this));
				}
			});

			// Update styles
			wysiwyg_div.find('.expander_container').css('border', '1px dotted #000').css('height', '15px').css('padding', '5px 20px 5px 20px').css('margin-top', '5px');
			wysiwyg_div.find('.expander_container h5').css('margin', 0).css('cursor', 'pointer').css('float', 'left');
			wysiwyg_div.find('.expander_container, .expander_heading, .expander_content').attr('contentEditable', false).disableSelection();
			wysiwyg_div.find('.expander_content').css('width', '1px').css('height', '1px').hide();
			wysiwyg_div.find('.controls').css('float', 'right').css('clear', 'right').css('display', 'inline');
			wysiwyg_div.find('.controls a').css('cursor', 'pointer');

			wysiwyg_div.find('.expander_container h5').on('click', function() {
				// Show popup
				popup.show();

				// Populate popup with content
				p_title.val($(this).html());
				p_content.html($(this).parent('.expander_container').find('.expander_content').html());
				p_auto_load.prop('checked', $(this).parent().hasClass('expanded'));

				// save element we're editing
				edited_element = $(this).parent();
			});

			wysiwyg_div.find('.move_up').on('click', function(event) {
				var parent = $(this).parents('.expander_container');
				parent.insertBefore(parent.prev());
				return false;
			});
			wysiwyg_div.find('.move_down').on('click', function(event) {
				var parent = $(this).parents('.expander_container');
				parent.insertAfter(parent.next());
				return false;
			});

			wysiwyg_div.find('.delete_exp').on('click', function(event) {
				if(confirm('Are you sure you want to delete this expander?')) {
					$(this).parents('.expander_container').remove();
				}
				return false;
			});
		}

		/*--------Front-End--------*/
		// Expand / Collapse Functionality
		$('.expander_container h5').on('click', function() {
			// Find our content div
			var parent = $(this).parent().eq(0);

			// Swap +/- image
			if(parent.hasClass('collapsed')) {
				$(parent).removeClass('collapsed').addClass('expanded');
				$(this).removeClass('collapsed').addClass('expanded');
			} else {
				$(parent).removeClass('expanded').addClass('collapsed');
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
		$('.expander_popup').click(function(event) {
		    popup.show().addClass('wait');
			event.stopPropagation();
			event.preventDefault();
		});

		$('.popup .container .nonclickable').click(function(event) {
		    event.preventDefault();
		    event.stopPropagation();
		});

		// Re-enable checkbox functionality (popup's stopPropagation() and preventDefault() screws it up)
		$('.clickable').on('click', function(event) {
			$(this).prop('checked', !$(this).prop('checked'));
			event.stopPropagation();
		});

		// Close the popup
		$('#expander_form .close').on('click', function() {
			// Close popup
			popup.hide();

			// Reset popup fields
			p_title.val('');
			p_content.html('');
			p_auto_load.prop('checked', false);

			// Reset the last edited element
			edited_element = null;
		});

		// Bind a handler to the 'Update' button to remove certain parts of the expanders
		$('#publish').on('click', function(event) {
			wysiwyg_div.find('.controls').remove();
			wysiwyg_div.find('.expander_container, .expander_heading, .expander_content').removeAttr('style').removeAttr('data-mce-style');
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

				if(wysiwyg_div.length == 1) {
					new_content = new_content + "&nbsp;";
				}

				if(edited_element != null) {
					// We're editing, so simply replace old content
					edited_element.replaceWith(new_content);
				} else {
					// We're adding, so insert new content at mouse position
					tinyMCE.get('content').execCommand('mceInsertContent', false, new_content);
				}
			}

			// Reset form fields
			p_title.val('');
			p_content.html('');
			p_auto_load.prop('checked', false);
			edited_element = null;

			// Close popup, update editor contents
			popup.hide();
			updateEditor();
		});

		// We are on the back-end, automatically run post editor updates
		var newWidth = $('#expander_popup .container').css('max-width');

		$('#wp-expandercontent-editor-container').width(newWidth).width("-=40px");
		$('#expandercontent_parent').css({
			'width': $('#wp-expandercontent-editor-container').width(),
			'float': 'left'
		});

		if(window.location.pathname.indexOf("wp-admin") > -1) {
			updateEditor();
		}
	})
})(jQuery);