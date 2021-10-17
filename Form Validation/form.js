let username = document.getElementById('username');
let eamil = document.getElementById('email');
let phone = document.getElementById('phone');

let usernameValid = false;
let emailValid = false;
let phoneValid = false;
checkStatus();

username.addEventListener('blur', () => {
    let str = username.value;
    let regx = /^[a-zA-Z]([0-9a-zA-Z]){2,10}/;
    if (regx.test(str)) {
        username.classList.remove('is-invalid');
        username.classList.add('is-valid');
        usernameValid = true;
    }
    else {
        username.classList.remove('is-valid');
        username.classList.add('is-invalid');
        usernameValid = false;
    }
    checkStatus();
});


eamil.addEventListener('blur', () => {
    let str = eamil.value;
    let regx = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    if (regx.test(str)) {
        eamil.classList.remove('is-invalid');
        eamil.classList.add('is-valid');
        emailValid = true;
    }
    else {
        eamil.classList.remove('is-valid');
        eamil.classList.add('is-invalid');
        emailValid = false;
    }
    checkStatus();
});


phone.addEventListener('blur', () => {
    let str = phone.value;
    let regx = /^([0-9]+){10}/;
    if (regx.test(str)) {
        phone.classList.remove('is-invalid');
        phone.classList.add('is-valid');
        phoneValid = true;
    }
    else {
        phone.classList.remove('is-valid');
        phone.classList.add('is-invalid');
        phoneValid = false;
    }
    checkStatus();
});

function checkStatus() {
    if (usernameValid && emailValid && phoneValid) {
        document.getElementById('submitBtn').disabled = false;
        let form = document.getElementById('registration');
        form.addEventListener('click', (e) => {
            e.preventDefault();
            let alert = document.getElementById('alert');
            alert.classList.replace('hide', 'show')
        });
    }
    else {
        document.getElementById('submitBtn').disabled = true;
    }
}