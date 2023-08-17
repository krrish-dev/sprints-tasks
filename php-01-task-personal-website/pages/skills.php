<?php
function generateSkillsList($skills) {
  echo '<h3>My Skills</h3>';
  echo '<ul>';
  foreach ($skills as $skill => $experience) {
    echo '<li>' . $skill . ' - ' . $experience . '</li>';
  }
  echo '</ul>';
}
?>
