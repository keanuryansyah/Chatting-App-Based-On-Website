<?php
session_start();
$permission = true;
if (!isset($_SESSION['logined'])) {
    header('Location: pages/signin-page');
    exit;
}

$pageTitle = 'mainpage';
require_once('header.php');

?>

<a href="logout.php">Logout</a>

<?php

require_once('footer.php');

?>