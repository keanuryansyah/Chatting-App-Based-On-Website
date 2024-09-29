<?php
if (!isset($permission)) {
    header('Location: ../pages/pagenot');
    exit;
}


?>

<section id="account-section" class="section">
    <div class="container">
        <div id="account-section-content-root">
            <div id="account-section-content-l-wr" class="asc">
                <div id="account-section-content-l">
                    <div class="account-section-content-l-t">
                        <div class="logo">
                            <img src="../images/logo2.webp" alt="">
                        </div>
                        <div class="account-tagline">
                            <div class="account-tagline-t">
                                <?php
                                switch ($pageTitle) {
                                    case 'signup':

                                ?>

                                        <h3>Create your account</h3>

                                    <?php

                                        break;

                                    case 'signin':

                                    ?>

                                        <h3>Get started</h3>

                                <?php

                                        break;
                                }
                                ?>
                            </div>
                            <div class="account-tagline-b">
                                <?php
                                switch ($pageTitle) {
                                    case 'signup':

                                ?>

                                        <span>Enter your details to create an account</span>

                                    <?php

                                        break;

                                    case 'signin':

                                    ?>

                                        <span>Welcome back! Enter your credentials to sign in</span>

                                <?php

                                        break;
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                    <form action="<?php $pageTitle === 'signup' ? '' : '' ?>" id="form-account" class="account-section-content-l-b" method="post" autocomplete="off">
                        <div class="username-input inp">
                            <?php if ($pageTitle === 'signin') {
                                echo "<span class=signinMessage>*Username/password is incorect.</span>";
                            } ?>
                            <div class="inp-t">
                                <input type="text" id="username" name="username" autocomplete="off">
                                <?php
                                switch ($pageTitle) {
                                    case 'signup':

                                ?>

                                        <span>Username</span>

                                    <?php

                                        break;

                                    case 'signin':

                                    ?>

                                        <span>Username/email</span>

                                <?php

                                        break;
                                }
                                ?>
                            </div>
                            <div class="inp-b">
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div class="email-input inp" style="display: <?php echo $pageTitle == 'signin' ? 'none' : '' ?>;">
                            <div class="inp-t">
                                <input type="text" id="email" name="email">
                                <span>Email address</span>
                            </div>
                            <div class="inp-b">
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div class="password-input inp">
                            <div class="inp-t">
                                <input type="password" id="password" autocomplete="off" name="password">
                                <span>Password</span>
                                <div id="iconPasswordWr">
                                    <i id="seePasswordIcon" class="material-icons show material-symbols-outlined passBtn">
                                        visibility_off
                                    </i>
                                    <i id="notSeePasswordIcon" class="material-icons material-symbols-outlined passBtn">
                                        visibility
                                    </i>
                                </div>
                            </div>
                            <div class="inp-b">
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div class="reenterpw-input inp" style="display: <?php echo $pageTitle == 'signin' ? 'none' : '' ?>;" autocomplete="on">
                            <div class="inp-t">
                                <input type="password" id="reenterpw" name="reenterpw">
                                <span>Re-enter password</span>
                            </div>
                            <div class="inp-b">
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div class="validation-agreements-input">
                            <input type="checkbox" id="<?php echo $pageTitle  === 'signup' ? 'validation-agreements' : 'keepme-logedin' ?>" name="<?php echo $pageTitle  === 'signup' ? 'validation-agreements' : 'keepme-logedin' ?>" name="validation-agreements">

                            <?php
                            switch ($pageTitle) {
                                case 'signup':

                            ?>
                                    <span>I agree with all terms and conditions</span>

                                <?php

                                    break;

                                case 'signin':

                                ?>

                                    <span>Keep me logged in</span>

                            <?php

                                    break;
                            }
                            ?>

                        </div>
                        <button type="submit" id="account-button" data-button="<?php echo $pageTitle  === 'signup' ? 'signupButton' : 'signinButton' ?>" disabled>
                            <?php
                            switch ($pageTitle) {
                                case 'signup':

                            ?>

                                    Sign up

                                <?php

                                    break;

                                case 'signin':

                                ?>

                                    Sign in
                            <?php

                                    break;
                            }
                            ?>
                        </button>
                    </form>
                    <div class="have-account">
                        <?php
                        switch ($pageTitle) {
                            case 'signup':

                        ?>

                                <span>Already have an account?</span>
                                <a href="http://chattingapp.web.test/pages/signin-page.php">Sign in</a>

                            <?php

                                break;

                            case 'signin':

                            ?>

                                <span>Don't have an account?</span>
                                <a href="signup-page.php">Sign up</a>

                        <?php

                                break;
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div id="account-section-content-r" class="asc">
                <img src="../images/signup-page-image.jpg" alt="">
            </div>
        </div>
    </div>
</section>

<?php

if ($pageTitle === 'signup') {

?>
    <div class="signup-message-wr">
        <div class="signup-message-content">
            <div class="signup-message-r1 sm">
                <img src="../images/checkmark.png" alt="">
            </div>
            <div class="signup-message-r2 sm">
                <h4>Succesfully created account.</h4>
            </div>
            <div class="signup-message-r3 sm">
                <p>Now you can get a new experience of getting to know and chatting with anyone!</p>
            </div>
            <div class="signup-message-r4 sm">
                <a class="button" href="#">Close</a>
                <a class="button" href="../pages/signin-page">Sign in</a>
            </div>
        </div>
    </div>

<?php

}

?>