<?php
/*
 Plugin Name: WordPress Expander
 Plugin URI: N/A
 Description: ...
 Author: Hetzel Creative
 License: Attribution-NonCommercial-ShareAlike 3.0 Unported
(http://creativecommons.org/licenses/by-nc-sa/3.0/legalcode)
*/

DEFINE('WPE_PLUGIN_NAME', "wordpress-expander");

// If we are adding / editing a page or post, include the popup html

if($pagenow == "post-new.php" || $pagenow == "post.php") {
	require_once('html/popup.html');
}


// Manage what stylesheets need to be loaded
function wpExpanderAddStylesheets() {
    $stylesheets = array("css/index.css");
    $n = 0;
    foreach ($stylesheets as $stylesheet) {
        $style_url = WP_PLUGIN_URL . '/' . WPE_PLUGIN_NAME . '/' . $stylesheet;
        $style_file = WP_PLUGIN_DIR . '/' . WPE_PLUGIN_NAME . '/' . $stylesheet;

        if (file_exists($style_file)) {
            wp_register_style('wpExpanderStyleSheets-' . $n, $style_url);
            wp_enqueue_style('wpExpanderStyleSheets-' . $n);
        }
        $n++;
    }
}

function wpExpanderAddScripts() {
    // Register scripts
    wp_register_script('wpExpander', WP_PLUGIN_URL . '/' . WPE_PLUGIN_NAME . '/js/index.js');

    // Enqueue the scripts
    wp_enqueue_script('wpExpander');
}

// Actions, Filters, Hooks

add_action('wp_print_styles', 'wpExpanderAddStylesheets');
add_action('admin_print_styles', 'wpExpanderAddStylesheets');

add_action('wp_enqueue_scripts', 'wpExpanderAddScripts');
add_action('admin_enqueue_scripts', 'wpExpanderAddScripts');

?>
