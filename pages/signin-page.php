<?php
session_start();
$permission = true;
if (isset($_SESSION['logined'])) {
    header('Location: /');
    exit;
}

require_once('../functions.php');

// // Cek apakah user di block atau tidak
// // Ambil ip user
// $ipUser = $_SERVER['REMOTE_ADDR'];
// if (!securedUser($ipUser)) {
//     header('Location: ../pages/blocked-page');
//     exit;
// }

$pageTitle = 'signin';
require_once('../header.php');
require_once('../sections/account-section.php');

?>

<?php
require_once('../footer.php');
