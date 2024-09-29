<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $permission = true;
    require_once('../functions.php');

    $signinData = file_get_contents('php://input');
    $signinData = json_decode($signinData);

    $validData = true;

    if (strlen($signinData->username) < 4 || strlen($signinData->password) < 4) {
        $validData = false;
    }

    if (!$validData) {
        return;
    }

    // Username / email
    $usernameUser = trim(htmlspecialchars($signinData->username));

    // Password 
    $passwordUser = trim(htmlspecialchars($signinData->password));

    // Remember me
    $remembermeUser = htmlspecialchars($signinData->rememberMe);

    // Cek apakah username ada
    $stmt = $conn->prepare("SELECT id_user FROM users WHERE username_user = ? OR email_user = ? ");
    $stmt->bind_param('ss', $usernameUser, $usernameUser);
    $stmt->execute();
    $idResultRow = $stmt->get_result();

    // Jika ada
    if ($idResultRow->num_rows > 0) {
        // Ambil id user
        $idUser = $idResultRow->fetch_assoc();
        $idUser = $idUser['id_user'];

        // Ambil password user
        $stmt = $conn->prepare("SELECT password_user FROM users WHERE id_user = ? ");
        $stmt->bind_param('s', $idUser);
        $stmt->execute();
        $passwordResultRow = $stmt->get_result();
        $passwordUserOnDb = $passwordResultRow->fetch_assoc();
        $passwordUserOnDb = $passwordUserOnDb['password_user'];

        if (password_verify($passwordUser, $passwordUserOnDb)) {
            // Ubah kolom remember me user yang barusan login
            $remembermeUser = mysqli_query($conn, "UPDATE users SET rememberme_user = $remembermeUser WHERE id_user = '$idUser' ");

            // Pasang session yang menandakan bahwa user telah berhasil login
            $_SESSION['logined'] = true;
            $_SESSION['thisUser'] = $idUser;

            echo 'success';
        } else {
            echo 'failed';
        }
    } else {
        echo 'failed';
    }
} else {
    header('Location: ../pages/pagenot');
    exit;
}
