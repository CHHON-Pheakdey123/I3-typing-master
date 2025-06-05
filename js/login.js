// Improved client-side login logic for multiple users
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
    if (user) {
      errorDiv.style.display = 'none';
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'index.html';
    } else {
      errorDiv.textContent = 'Invalid username/email or password.';
      errorDiv.style.display = 'block';
    }
  });
});
