// Improved client-side registration logic for multiple users
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  if (!registerForm) return;
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorDiv = document.getElementById('register-error');
    if (password.length < 8) {
      errorDiv.textContent = 'Password must be at least 8 characters.';
      errorDiv.style.display = 'block';
      return;
    }
    if (password !== confirmPassword) {
      errorDiv.textContent = 'Passwords do not match.';
      errorDiv.style.display = 'block';
      return;
    }
    // Get users array from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Check if username or email already exists
    if (users.some(u => u.username === username)) {
      errorDiv.textContent = 'Username already exists.';
      errorDiv.style.display = 'block';
      return;
    }
    if (users.some(u => u.email === email)) {
      errorDiv.textContent = 'Email already registered.';
      errorDiv.style.display = 'block';
      return;
    }
    // Add new user
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    errorDiv.style.display = 'none';
    window.location.href = 'login.html';
  });
});
