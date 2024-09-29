<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../style.css">
</head>

<body>

    <h1 style="text-align: center;">MAAF, ANDA TELAH KAMI BLOKIR KARENA TELAH MELAKUKAN TINDAKAN YANG ILEGAL!!!</h1>

</body>

</html>

<?php

$myNames = 'keanu_ryansyah@gmail.com';
$newName = explode('@', $myNames);
if (count($newName) < 2) {
    echo 'kiw';
} else {
    echo $newName[count($newName) - 1];
}
?>