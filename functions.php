<?php

// Make sure certain buttons are added to the tinymce editor
function wpExpanderButtons($buttons) {
    $buttons[] = "image";

    return $buttons;
}

?>