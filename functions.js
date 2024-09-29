/**
=========================
* FUNCTION UNTUK INPUT
*=========================
*/

const validUsername = (username) => {
    let regex = /^[^\d].*/;
    if (username == '') {
        return true;
    }
    return regex.test(username);
}

const emailValidation = (email) => {

    let emailValid = false;

    let emailToSplit = email.split('@');
    if (emailToSplit[emailToSplit.length - 1] === 'gmail.com') {
        emailValid = true;
    } else {
        emailValid = false;
    }

    return emailValid;
}

const generateWarning = (signupInput, warningText) => {

    let warningTextElWr = signupInput.parentElement.nextElementSibling;

    let warningTextElP = warningTextElWr.querySelector('p');

    warningTextElP.innerText = warningText;

    warningTextElWr.classList.add('show');



}

const removeWarning = (signupInput) => {
    signupInput.parentElement.nextElementSibling.classList.remove('show');
}

const seeAndHidePassword = (passwordIcon) => {
    let currentPassIcon = passwordIcon.getAttribute('id');
    let passwordInput = passwordIcon.parentElement.parentElement.querySelector('#password');

    switch (currentPassIcon) {
        case 'seePasswordIcon':

            passwordInput.setAttribute('type', 'text');

            passwordIcon.classList.remove('show');
            passwordIcon.nextElementSibling.classList.add('show');

            break;

        default:

            passwordInput.setAttribute('type', 'password');

            passwordIcon.classList.remove('show');
            passwordIcon.previousElementSibling.classList.add('show');

    }

}


const inputAnimationFocus = (input) => {

    let formLabels = document.querySelectorAll('.inp-t span');
    formLabels.forEach(formLabel => {

        if (formLabel.previousElementSibling.value === '') {
            formLabel.classList.remove('focus');
        }


        if (formLabel === input.nextElementSibling) {
            formLabel.classList.add('focus');
        }
    })

}

const inputAnimationBlur = (inputs) => {

    inputs.forEach(input => {
        if (input.value === '') {
            input.nextElementSibling.classList.remove('focus');
        }
    })

}

const checkboxChecked = (checkbox) => {
    let checkboxStatus = false;
    if (checkbox.checked) {
        checkboxStatus = true;
    }

    return checkboxStatus;
}

function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

function generate9DigitRandomNumber() {
    return Math.floor(100000000 + Math.random() * 900000000);
}


let inputs = document.querySelectorAll('.inp-t input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        inputAnimationFocus(input);
    })
})

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        inputAnimationBlur(inputs);
    })
})


const clearField = () => {
    const fields = document.querySelectorAll('.inp-t input');
    fields.forEach(field => {
        field.value = '';
    })
}


/**
=========================
* END
*=========================
*/

