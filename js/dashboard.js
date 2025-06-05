// Show user info if logged in, else redirect to login
const user = JSON.parse(localStorage.getItem('currentUser'));
const content = document.getElementById('dashboard-content');
if (!user) {
  window.location.href = 'login.html';
} else {
  renderDashboard();
}

function renderDashboard() {
  const allHistory = JSON.parse(localStorage.getItem('history')) || {};
  const userHistory = allHistory[user.username] || [];
  let historyHtml = '';
  if (userHistory.length === 0) {
    historyHtml = '<p>No typing test history yet.</p>';
  } else {
    historyHtml = `
      <table style="width:100%;margin-top:2rem;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="border-bottom:1px solid #ccc;padding:8px;">Date</th>
            <th style="border-bottom:1px solid #ccc;padding:8px;">WPM</th>
            <th style="border-bottom:1px solid #ccc;padding:8px;">Accuracy</th>
            <th style="border-bottom:1px solid #ccc;padding:8px;">Time (s)</th>
            <th style="border-bottom:1px solid #ccc;padding:8px;">Delete</th>
          </tr>
        </thead>
        <tbody>
          ${userHistory.map((h, i) => `
            <tr>
              <td style="padding:8px;">${h.date}</td>
              <td style="padding:8px;">${h.wpm}</td>
              <td style="padding:8px;">${h.accuracy}%</td>
              <td style="padding:8px;">${h.time}</td>
              <td style="padding:8px;text-align:center;">
                <button class="delete-history-btn" data-index="${i}" title="Delete" style="background:none;border:none;cursor:pointer;font-size:1.2rem;color:#e74c3c;">
                  🗑️
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  content.innerHTML = `
    <h2>Hello, ${user.username}!</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <h3>Your Typing Test History</h3>
    ${historyHtml}
  `;

  // Add delete event listeners
  document.querySelectorAll('.delete-history-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-index'));
      const allHistory = JSON.parse(localStorage.getItem('history')) || {};
      if (allHistory[user.username]) {
        allHistory[user.username].splice(idx, 1);
        localStorage.setItem('history', JSON.stringify(allHistory));
      }
      renderDashboard();
    });
  });
}
