<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $permission = true;
    require_once('../functions.php');

    // Ambil ip user
    $ipUser = $_SERVER['REMOTE_ADDR'];
    // Ini data signup
    $signupData = json_decode(file_get_contents('php://input'));

    // Cek apakah user klik tombol signup secara ilegal?
    $validData = true;

    if ($signupData->username === '' || strlen($signupData->username) < 4) {
        $validData = false;
    } else if ($signupData->email === '' || strlen($signupData->email) < 4) {
        $validData = false;
    } else if ($signupData->password === '' || strlen($signupData->password) < 8) {
        $validData = false;
    } else if ($signupData->reenterpw !== $signupData->password || $signupData->password === $signupData->username) {
        $validData = false;
    } else if ($signupData->password === $signupData->username . '123') {
        $validData = false;
    }

    // Cek apakah email valid
    $checkEmailValid = explode('@', $signupData->email);
    if (count($checkEmailValid) < 2) {
        $validData = false;
    } else {
        if ($checkEmailValid[count($checkEmailValid) - 1] === 'gmail.com') {
            $validData = true;
        } else {
            $validData = false;
        }
    }

    // Jika ilegal, block user tersebut!
    if (!$validData) {
        echo 'invalidData';
        return;
    }

    // ID-ROW
    $idUser = null;

    // USERNAME-USER
    $usernameUser = trim(htmlspecialchars($signupData->username));

    // EMAIL-USER
    $emailUser = trim(htmlspecialchars($signupData->email));

    // PASSWORD-USER
    $passwordUser = htmlspecialchars($signupData->password);
    $passwordUser = password_hash($passwordUser, PASSWORD_DEFAULT);

    // PROFPIC-USER
    $profpicUser = 'none';

    // BIO-USER
    $bioUser = 'none';

    // ONLINE-USER
    $onlineUser = 'none';

    // CREATED-USER
    $createdUser = getCurrentTime()['full'];

    // REMEMBERME-USER
    $remembermeUser = 0;

    // Cek apakah username sudah terpakai
    $stmt = $conn->prepare("SELECT username_user FROM users WHERE username_user = ? ");
    $stmt->bind_param('s', $usernameUser);
    $stmt->execute();
    $usernameResultRow = $stmt->get_result();

    if ($usernameResultRow->num_rows > 0) {
        echo 'usernameUsed';
        return;
    }

    // Cek apakah email sudah terpakai
    $stmt = $conn->prepare("SELECT email_user FROM users WHERE email_user = ? ");
    $stmt->bind_param('s', $emailUser);
    $stmt->execute();
    $emailResultRow = $stmt->get_result();

    if ($emailResultRow->num_rows > 0) {
        echo 'emailUsed';
        return;
    }

    // Insert data ke tabel users
    $sql = 'INSERT INTO users (id_user, username_user, email_user, password_user, profpic_user, bio_user, online_user, created_user, rememberme_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    $stmt = $conn->prepare($sql);

    $stmt->bind_param('ssssssssi', $idUser, $usernameUser, $emailUser, $passwordUser, $profpicUser, $bioUser, $onlineUser, $createdUser, $remembermeUser);

    if ($stmt->execute()) {
        echo 'success';
    }
} else {
    header('Location: ../pages/pagenot');
    exit;
}
