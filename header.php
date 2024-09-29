<?php
if (!isset($permission)) {
    header('Location: pages/pagenot');
    exit;
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>

    <!--=========================
    * GLOBAL CSS
    *=========================-->
    <link rel="stylesheet" href="/style.css">

    <!--=========================
    * GOOGLE ICONS
    *=========================-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


    <?php

    switch ($pageTitle) {
        case 'signup':

    ?>

            <link rel="stylesheet" href="/css/account.css">

        <?php

            break;

        case 'signin':

        ?>
            <link rel="stylesheet" href="/css/account.css">
    <?php

            break;
    }


    ?>

</head>

<body>