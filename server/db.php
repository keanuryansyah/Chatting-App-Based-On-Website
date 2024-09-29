<?php
if (!isset($permission)) {
    header('Location: ../pages/pagenot');
    exit;
}

$host = 'localhost';
$user = 'root';
$password = '';
$dbName = 'chattingapp.web';

$conn = mysqli_connect($host, $user, $password, $dbName);

if (!$conn) {
    echo 'Database not connected.';
}
