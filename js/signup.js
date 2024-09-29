/**
 =========================
 * Validasi form sign up pada sisi client
 *=========================
 */

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        clearField();

    }, 800)
})

const formAccount = document.getElementById('form-account');
let validationCheckbox = document.querySelector('.validation-agreements-input input');
const accountButton = document.getElementById('account-button');

const signupValidationOnClient = (signupInput, signupInputs) => {

    let currentSignupInput = signupInput.getAttribute('id');


    switch (currentSignupInput) {

        // Validasi username
        case 'username':

            // Ketika username diawali dengan angka
            if (!validUsername(signupInput.value)) {
                generateWarning(signupInput, '*Username tidak boleh diawali dengan angka.');
                // Ketika username memiliki panjang kurang dari 4 karakter
            } else if (signupInput.value.length < 4 && signupInput.value.length > 0) {
                generateWarning(signupInput, '*Username harus memiliki panjang minimal 4 karakter.');
                // Ketika username memiliki panjang lebih dari 16 karakter
            } else if (signupInput.value.length > 20) {
                generateWarning(signupInput, '*Panjang username maksimal 20 karakter.');
                // Ketika isi input username kosong 
            } else if (signupInput.value === '') {
                removeWarning(signupInput);
                // Ketika semua kondisi diatas false
            } else {
                removeWarning(signupInput);
            }

            // Mengecek apakah password sama dengan username
            if (formAccount.elements.password.value === signupInput.value && formAccount.elements.password.value.length > 0) {
                generateWarning(formAccount.elements.password, '*Password tidak aman.');
                // Cek apakah password sama dengan username123
            } else if (formAccount.elements.password.value === signupInput.value + 123) {
                generateWarning(formAccount.elements.password, '*Password tidak aman.');
            } else {
                removeWarning(formAccount.elements.password);
            }

            break;

        // Validasi email
        case 'email':
            // Ketika email tidak mengandung @gmail.com 
            if (!emailValidation(signupInput.value)) {
                generateWarning(signupInput, '*Email tidak valid.');
                // Ketika email mengandung @gmail.com
            } else {
                removeWarning(signupInput);
            }
            // Ketika isi input email kosong
            if (signupInput.value === '') {
                removeWarning(signupInput);
            }

            break;

        // Validasi password
        case 'password':

            // Ambil re-enter password input
            let reenterPwInput = document.querySelector('.reenterpw-input');
            // Tambahkan class show pada re-enter password input
            reenterPwInput.classList.add('show');

            // Ketika password input panjang nya kurang dari 8 karakter
            if (signupInput.value.length < 8 && signupInput.value.length > 0) {
                generateWarning(signupInput, '*Password harus memiliki panjang minimal 8 karakter.');
                reenterPwInput.classList.remove('show');
                reenterPwInput.querySelector('.inp-t input').value = '';
                reenterPwInput.querySelector('.inp-t span').classList.remove('focus');

                accountButton.disabled = true;

                return;

                // Ketika password input nilainya kosong
            } else if (signupInput.value === '') {
                reenterPwInput.classList.remove('show');
                reenterPwInput.querySelector('.inp-t input').value = '';
                reenterPwInput.querySelector('.inp-t span').classList.remove('focus');

                removeWarning(signupInput);

                accountButton.disabled = true;
                return;

            }

            removeWarning(signupInput);

            // Cek apakah password sama dengan username
            if (signupInput.value === formAccount.elements.username.value || signupInput.value === formAccount.elements.username.value + 123) {
                generateWarning(signupInput, '*Password tidak aman.');
            } else {
                removeWarning(signupInput);
            }

            // Cek apakah re-enter password sama dengan password
            if (signupInput.value !== formAccount.elements.reenterpw.value && formAccount.elements.reenterpw.value.length > 0) {
                generateWarning(formAccount.elements.reenterpw, '*Password tidak sama.');
            } else {
                removeWarning(formAccount.elements.reenterpw);
            }

            break;

        // Validasi re-enter password
        case 'reenterpw':

            // Cek apakah re-enter password sama dengan password
            if (signupInput.value !== formAccount.elements.password.value && signupInput.value.length > 0) {
                generateWarning(signupInput, '*Password tidak sama.');
            } else {
                removeWarning(signupInput);
            }

            break;
    }

    // Cek apakah semua data siap dikirim
    let inputAreFilled = true;

    let warningElems = document.querySelectorAll('.inp-b');
    signupInputs.forEach(signupInp => {
        warningElems.forEach(warningElem => {
            if (signupInp.value === '' || warningElem.classList.contains('show')) {
                inputAreFilled = false;
            }
        })
    })

    // Jika data siap dikirim
    if (inputAreFilled && checkboxChecked(validationCheckbox)) {
        accountButton.disabled = false;
        // Jika data belum siap dikirim
    } else {
        accountButton.disabled = true;
    }
}

// Memvalidasi semua isi input 
let signupInputs = document.querySelectorAll('.inp input');
signupInputs.forEach(signupInput => {
    signupInput.addEventListener('input', () => {

        signupValidationOnClient(signupInput, signupInputs);

    })
})

// Untuk melihat password dan menyembunyikan password
let passwordIcons = document.querySelectorAll('.passBtn');

passwordIcons.forEach(passwordIcon => {

    passwordIcon.addEventListener('click', () => {

        seeAndHidePassword(passwordIcon);

    })

})

// Jika validasi checkbox di checked atau uncheck
validationCheckbox.addEventListener('click', () => {
    if (checkboxChecked(validationCheckbox)) {
        let inputAreFilled = true;

        let warningElems = document.querySelectorAll('.inp-b');
        signupInputs.forEach(signupInp => {
            warningElems.forEach(warningElem => {
                if (signupInp.value === '' || warningElem.classList.contains('show')) {
                    inputAreFilled = false;
                }
            })
        })

        if (inputAreFilled) {
            accountButton.disabled = false;
        } else {
            accountButton.disabled = true;
        }

    } else {
        accountButton.disabled = true;
    }
})

// Ketika tombol signup di click
accountButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Cek apakah semua data sudah valid
    let dataValid = true;

    signupInputs.forEach(signupInput => {
        if (signupInput.value.length < 4) {
            dataValid = false;
        }
    })

    // Jika email tidak valid
    if (!emailValidation(formAccount.elements.email.value)) {
        dataValid = false;
    }

    // Jika password sama dengan username / password sama dengan username123
    if (formAccount.elements.password.value === formAccount.elements.username.value || formAccount.elements.password.value === formAccount.elements.username.value + '123') {
        dataValid = false;
    }

    // Jika re-enter password tidak sama dengan password
    if (formAccount.elements.reenterpw.value !== formAccount.elements.password.value) {
        dataValid = false;
    }

    // Jika input warning masih ada yang muncul
    let warningElems = document.querySelectorAll('.inp-b');

    warningElems.forEach(warningElem => {
        if (warningElem.classList.contains('show')) {
            dataValid = false;
        }
    })

    // Jika checkbox belum di click
    if (!checkboxChecked(validationCheckbox)) {
        dataValid = 'notchecked';
    }

    // Logo signup message
    let messageLogo = document.querySelector('.signup-message-r1 img');

    let signupMessageWr = document.querySelector('.signup-message-wr');

    // Pesan signup message
    let signupMessageMain = document.querySelector('.signup-message-r2 h4');

    // Text signup message
    let signupMessageText = document.querySelector('.signup-message-r3 p');

    // Tombol signup message
    let signupMessageButtons = document.querySelectorAll('.signup-message-r4 a');

    // Jika semua data sudah valid, kirim semua data ke server untuk validasi selanjutnya
    if (dataValid === true) {

        // Hash password
        const passwordHashed = hashPassword(formAccount.elements.password.value);

        // Reenter password has
        const reenterpwHashed = hashPassword(formAccount.elements.reenterpw.value);

        let signupData = {
            username: formAccount.elements.username.value,
            email: formAccount.elements.email.value,
            password: passwordHashed,
            reenterpw: reenterpwHashed,
            validation: validationCheckbox.checked
        }

        fetch('../server/signup-server.php', {
            method: 'post',
            body: JSON.stringify(signupData)
        })
            .then(response => response.text())
            .then(responseData => {

                switch (responseData) {
                    case 'success':

                        messageLogo.src = '../images/checkmark.png';
                        signupMessageMain.innerText = 'Succesfully created account.';
                        signupMessageText.innerText = 'Now you can get a new experience of getting to know and chatting with anyone!';
                        signupMessageButtons[1].style.display = 'block';

                        setTimeout(() => {

                            signupMessageWr.classList.add('show');

                            signupInputs.forEach(signupInput => {
                                signupInput.value = '';
                                signupInput.nextElementSibling.classList.remove('focus');
                            })

                            validationCheckbox.checked = false;
                            accountButton.disabled = true;
                        }, 1000);

                        dataValid = true;

                        break;

                    case 'usernameUsed':

                        messageLogo.src = '../images/close.png';
                        signupMessageMain.innerText = 'Unsuccesfully created account.';
                        signupMessageText.innerText = 'Username has been used.';
                        signupMessageButtons[1].style.display = 'none';

                        setTimeout(() => {

                            signupMessageWr.classList.add('show');

                            signupInputs.forEach(signupInput => {
                                if (signupInput.getAttribute('id') === 'username') {
                                    signupInput.value = '';
                                    signupInput.focus();
                                }
                            })

                            accountButton.disabled = true;

                        }, 1000);

                        dataValid = true;

                        break;

                    case 'emailUsed':

                        messageLogo.src = '../images/close.png';
                        signupMessageMain.innerText = 'Unsuccesfully created account.';
                        signupMessageText.innerText = 'Email has been used.';
                        signupMessageButtons[1].style.display = 'none';

                        setTimeout(() => {

                            signupMessageWr.classList.add('show');

                            signupInputs.forEach(signupInput => {
                                if (signupInput.getAttribute('id') === 'email') {
                                    signupInput.value = '';
                                    signupInput.focus();
                                }
                            })

                            accountButton.disabled = true;

                        }, 1000);

                        dataValid = true;

                        break;

                    // Jika data terdeteksi tidak valid di sisi server
                    case 'invalidData':

                        messageLogo.src = '../images/close.png';
                        signupMessageMain.innerText = 'Unsuccessfully created account.';
                        signupMessageText.innerText = 'Sorry your data is not valid, please try again.';
                        signupMessageButtons[1].style.display = 'none';

                        setTimeout(() => {

                            signupMessageWr.classList.add('show');

                            signupInputs.forEach(signupInput => {
                                signupInput.value = '';
                                signupInput.nextElementSibling.classList.remove('focus');
                            })

                            validationCheckbox.checked = false;
                            accountButton.disabled = true;
                        }, 1000);

                        dataValid = true;

                        break;
                }

            })

        // Jika data terdeksi tidak valid di sisi client
    } else if (dataValid === 'notchecked') {

        messageLogo.src = '../images/close.png';
        signupMessageMain.innerText = 'Unsuccessfully created account.';
        signupMessageText.innerText = 'You must agree to the terms and conditions to continue.';
        signupMessageButtons[1].style.display = 'none';

        setTimeout(() => {
            signupMessageWr.classList.add('show');
            validationCheckbox.checked = false;
            accountButton.disabled = true;
        }, 1000);

        dataValid = true;

    } else {
        messageLogo.src = '../images/close.png';
        signupMessageMain.innerText = 'Unsuccessfully created account.';
        signupMessageText.innerText = 'Sorry your data is not valid, please try again.';
        signupMessageButtons[1].style.display = 'none';

        setTimeout(() => {

            signupMessageWr.classList.add('show');

            signupInputs.forEach(signupInput => {
                signupInput.value = '';
                signupInput.nextElementSibling.classList.remove('focus');
            })

            validationCheckbox.checked = false;
            accountButton.disabled = true;
        }, 1000);

        dataValid = true;

    }


})

let closeButtonSignupMessage = document.querySelector('.signup-message-r4 a:first-child');
closeButtonSignupMessage.addEventListener('click', (e) => {
    e.preventDefault();

    let signupMessageWr = document.querySelector('.signup-message-wr');
    signupMessageWr.classList.remove('show');

})