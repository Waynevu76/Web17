var correctUser = 'waynevu';
var correctPassword = '123456';

var inputUsername = document.getElementById("username");
var inputPassword = document.getElementById('password');

var formLogin = document.getElementById('form-login');
if(formLogin.attachEvent) {
    formLogin.attachEvent('submit', onFormSubmit);
} else {
    formLogin.addEventListener('submit', onFormSubmit);
}

function onFormSubmit(e) {
    var username = inputUsername.value;
    var password = inputPassword.value;

    if(username == correctUser && password == correctPassword) {
        alert('Login successfull');
        var win = window.open("CV.html");
    } else {
        alert('Pls login again');
    }
}