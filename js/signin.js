let formAccount = document.getElementById('form-account');
let passwordIcons = document.querySelectorAll('.passBtn');

passwordIcons.forEach(passwordIcon => {

    passwordIcon.addEventListener('click', () => {

        seeAndHidePassword(passwordIcon);

    })

})

let signinInputs = document.querySelectorAll('.inp input');
const accountButton = document.getElementById('account-button')

signinInputs.forEach(signinInput => {
    signinInput.addEventListener('input', () => {
        let currentInput = signinInput.getAttribute('id');
        switch (currentInput) {
            case 'username':

                if (signinInput.value.length > 3) {
                    signinInputs.forEach(signinInp => {
                        if (signinInp.getAttribute('id') === 'password') {
                            if (signinInp.value.length > 3) {
                                accountButton.disabled = false;
                            } else {
                                accountButton.disabled = true;
                            }
                        }
                    })
                } else {
                    accountButton.disabled = true;
                }

                break;

            case 'password':

                if (signinInput.value.length > 3) {
                    signinInputs.forEach(signinInp => {
                        if (signinInp.getAttribute('id') === 'username') {
                            if (signinInp.value.length > 3) {
                                accountButton.disabled = false;
                            } else {
                                accountButton.disabled = true;
                            }
                        }
                    })
                } else {
                    accountButton.disabled = true;
                }

                break;
        }
    })
})

accountButton.addEventListener('click', (e) => {
    e.preventDefault();

    let signinMessage = document.querySelector('.signinMessage');

    let validData = true;
    // Cek apakah semua input sudah terisi dan valid
    if (formAccount.elements.username.value < 4) {
        validData = false;
    } else if (formAccount.elements.password.value.length < 4) {
        validData = false;
    }

    // Cek apakah user centang keep me logged in
    let keepMeLoggedIn = document.getElementById('keepme-logedin');

    // Jika data valid
    if (validData) {

        // Masukkan data ke dalam objek
        let signinData = {
            username: formAccount.elements.username.value,
            password: hashPassword(formAccount.elements.password.value),
            rememberMe: keepMeLoggedIn.checked
        };

        fetch('../server/signin-server.php', {
            method: 'post',
            body: JSON.stringify(signinData)
        })
            .then(response => response.text())
            .then(responseData => {
                console.log(responseData);
                if (responseData === 'success') {

                    setTimeout(() => {
                        signinMessage.style.display = 'none';
                        signinInputs.forEach(signinInp => {
                            signinInp.value = '';
                            signinInp.nextElementSibling.classList.remove('focus');
                        })
                        keepMeLoggedIn.checked = false;
                        accountButton.disabled = true;
                    }, 500)


                    setTimeout(() => {
                        window.location.href = '../';
                    }, 1000)

                } else {
                    signinMessage.style.display = 'none';
                    setTimeout(() => {
                        signinMessage.style.display = 'block';
                        signinInputs.forEach(signinInp => {
                            if (signinInp.getAttribute('id') === 'password') {
                                signinInp.focus();
                            }
                        })
                    }, 500)
                }
            })


        // Jika data tidak valid
    } else {
        signinMessage.style.display = 'block';
        form.elements.username.focus();
    }

})