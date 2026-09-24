const toggle = document.querySelector('.password-toggle');
const password = document.querySelector('#password');
const loginForm = document.querySelector('#login-form');
const message = document.querySelector('#form-message');

if (toggle && password) {
  toggle.addEventListener('click', () => {
    const visible = password.type === 'text';
    password.type = visible ? 'password' : 'text';
    toggle.textContent = visible ? 'Show' : 'Hide';
    toggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    message.textContent = 'Demo form submitted. Connect this form to your authentication service.';
  });
}
