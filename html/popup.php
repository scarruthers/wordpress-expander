<div id='expander_popup' style='display:none;' class='popup'>
	<!--POPUP START-->
	<div class='container'>
		<div class='wrapper'>
			<div class='headerdude'>
				<h3>Insert Expander</h3>
				<a class='close'><div class='closeBtn'></div></a>
			</div>
			<div class='contentWrapper'>
				<div class='content'>
					<form id='expander_form' name='expander_form' method='post' action=''>
						<div class='nonclickable'>
							<label>Expander Title:
								<input type='text' name='title' id='expander_title' />
							</label>
							<br /><br /><br />
							
							<?php
							$args = array(
								'media_buttons' => false,
								'textarea_rows' => 5,
								'tabindex' => 2,
								'teeny' => true,
								'quicktags' => false,
							);
							wp_editor('', 'expandercontent', $args); 
							
							?>
						</div>
						<br />
						
						<label class='clickable'>Show content on page load?
							<input type='checkbox' name='auto_load' id='expander_auto_load' value='yes' />
						</label>
						
						<div class='nonclickable'>
							<a href='#' class='button add_expander'>Insert Into Page</a>
							<a href='#' class='close'>Cancel</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div><!--POPUP END-->