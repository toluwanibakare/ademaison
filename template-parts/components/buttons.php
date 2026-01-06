<?php
// buttons.php — button markup helper
function ademaison_button($text, $class='') {
  echo '<button class="'.$class.'">'.esc_html($text).'</button>';
}
