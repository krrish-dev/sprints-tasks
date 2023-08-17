<?php
$skills = [
  "Web Development" => "3 years",
  "Graphic Design" => "2 years"
];

require('skills.php');
?>

<!DOCTYPE html>
<html>
<head>
  <title>My Skills</title>
  <link rel="stylesheet" type="text/css" href="../css/style.css">
  <link rel="stylesheet" type="text/css" href="../css/home-styles.css">
</head>
<body>
  <header>
    <h1>My Personal Website</h1>
    <nav>
      <ul>
        <li><a href="home.php">Home</a></li>
        <li><a href="profile.php">Profile</a></li>
        <li><a href="myskills.php">My Skills</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <div class="card">
    <h1>My Skills</h1>
    <?php generateSkillsList($skills); ?>
    </div>
  </main>

  <footer>
    <p>&copy; 2023 My Personal Website. All rights reserved.</p>
  </footer>
</body>
</html>
