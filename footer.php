<?php
if (!isset($permission)) {
    header('Location: pages/pagenot');
    exit;
}


?>

<script src="/global.js"></script>
<script src="/functions.js"></script>
<?php
switch ($pageTitle) {
    case 'signup':

?>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
        <script src="/js/signup.js"></script>

    <?php

        break;

    case 'signin':

    ?>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
        <script src="/js/signin.js"></script>


<?php

        break;
}
?>
</body>

</html>