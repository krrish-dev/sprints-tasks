<?php
$users = json_decode(file_get_contents('../data/users.json'), true);
$user = $users[0];
$skills = [
  "Web Development" => "3 years",
  "Graphic Design" => "2 years"
];
require('skills.php'); // Include the skills.php file
?>

<!DOCTYPE html>
<html>
<head>
  <title>Profile</title>
  <link rel="stylesheet" type="text/css" href="../css/style.css">
  <link rel="stylesheet" type="text/css" href="../css/home-styles.css">
  <link rel="stylesheet" type="text/css" href="../css/profile-styles.css">
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
    <div class="profile-card">
      <img src="../images/avatar.png" alt="Avatar">
      <h2><?php echo $user['name']; ?></h2>
      <p><?php echo $user['email']; ?></p>
      <p><?php echo $user['bio']; ?></p>
      
      <?php generateSkillsList($skills); // Call the generateSkillsList function ?>
    </div>
  </main>

  <footer>
    <p>&copy; 2023 My Personal Website. All rights reserved.</p>
  </footer>
</body>
</html>
