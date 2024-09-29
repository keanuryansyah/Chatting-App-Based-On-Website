<?php
require_once('server/db.php');

date_default_timezone_set('Asia/Jakarta');

function getCurrentTime()
{

    $fullTimeString = date('H:i:s Y-m-d');
    $fullTimeStringToArray = explode(' ', $fullTimeString);
    $times = [
        'full' => $fullTimeString,
        'his' => $fullTimeStringToArray[0],
        'ymd' => $fullTimeStringToArray[1]
    ];



    return $times;
}

// function blockUser($ipAddress)
// {
//     global $conn;
//     $null = null;
//     $stmt = $conn->prepare('INSERT INTO users_blocked (idIp, ip_address) VALUES (?, ?)');
//     $stmt->bind_param('is', $null, $ipAddress);
//     $stmt->execute();


//     return true;
// }

// function securedUser($userIp)
// {
//     global $conn;

//     $stmt = $conn->prepare("SELECT ip_address FROM users_blocked WHERE ip_address = ? ");
//     $stmt->bind_param('s', $userIp);
//     $stmt->execute();
//     $result = $stmt->get_result();

//     if ($result->num_rows > 0) {
//         return false;
//         exit;
//     }

//     return true;
// }
