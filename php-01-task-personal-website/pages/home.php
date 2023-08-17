<?php
if (basename($_SERVER['PHP_SELF']) === 'index.php') {
    $users = json_decode(file_get_contents('data/users.json'), true);
} else {
    $users = json_decode(file_get_contents('../data/users.json'), true);
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <base href="http://localhost/php-01-task-personal-website/">
  <link rel="stylesheet" type="text/css" href="css/style.css">  
  <link rel="stylesheet" type="text/css" href="css/home-styles.css">
</head>
<body>
  <header>
    <h1>My Personal Website</h1>
    <nav>
      <ul>
        <li><a href="pages/home.php">Home</a></li>
        <li><a href="pages/profile.php">Profile</a></li>
        <li><a href="pages/myskills.php">My Skills</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <h2>Users</h2>
    <div class="user-cards">
      <?php foreach ($users as $user) : ?>
        <div class="user-card">
          <img src="images/<?php echo $user['avatar']; ?>" alt="Avatar">
          <h3><?php echo $user['name']; ?></h3>
          <p>Email: <?php echo $user['email']; ?></p>
          <p>Bio: <?php echo $user['bio']; ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </main>

  <footer>
    <p>&copy; 2023 My Personal Website. All rights reserved.</p>
  </footer>
</body>
</html>
