document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');

    const registrationDiv = document.getElementById('registration');
    const loginDiv = document.getElementById('login');
    const homeDiv = document.getElementById('home');

    const registerMessage = document.getElementById('registerMessage');
    const loginMessage = document.getElementById('loginMessage');
    const userNameSpan = document.getElementById('userName');

    const showDiv = (div) => {
        registrationDiv.style.display = 'none';
        loginDiv.style.display = 'none';
        homeDiv.style.display = 'none';
        div.style.display = 'flex';
    };

    const showRegister = () => showDiv(registrationDiv);
    const showLogin = () => showDiv(loginDiv);
    const showHome = (name) => {
        userNameSpan.textContent = name;
        showDiv(homeDiv);
    };

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (localStorage.getItem(email)) {
            registerMessage.textContent = 'Email already registered!';
        } else {
            localStorage.setItem(email, JSON.stringify({ name, email, password }));
            showLogin();
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passwordLogin').value;

        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            showHome(user.name);
        } else {
            loginMessage.textContent = 'Invalid email or password!';
        }
    });

    logoutButton.addEventListener('click', () => {
        showLogin();
    });

    // Initialize by showing the registration form
    showRegister();
});
