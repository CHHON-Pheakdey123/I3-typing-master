# i3_typing_master

## Typing master

Typing Master is a web-based application designed to help users improve their typing speed and accuracy through interactive lessons and tests. It features user registration, login, typing tests, progress tracking, and a dashboard for reviewing typing history.

## Features

- **User Registration & Login:**  
  Users can create an account and log in securely. Registration checks for unique usernames and emails.

- **Typing Test:**  
  Interactive typing test with selectable durations (60s, 90s, 120s, 180s). Real-time WPM and accuracy stats are displayed.

- **Progress Tracking:**  
  After each test, results (WPM, accuracy, time, date) are saved to the logged-in user's history in localStorage.

- **Dashboard:**  
  Logged-in users can view their typing history, including WPM, accuracy, and test date. Users can delete individual history entries.

- **Responsive Design:**  
  The UI is responsive and works well on both desktop and mobile devices.

- **About Us:**  
  Learn more about the project, team, and mission.

## How It Works

- **Data Storage:**  
  All user data and typing history are stored in the browser's `localStorage`. No backend is required.

- **Navigation:**  
  The navigation bar is consistent across all pages and styled to match the footer.

- **Session Management:**  
  The currently logged-in user is tracked via `localStorage` (`currentUser`). Logging out removes this key.

- **Typing Test:**  
  The test area is keyboard-accessible. Results are calculated and shown in a modal summary, and saved if the user is logged in.

- **Dashboard:**  
  Displays a table of all past typing tests for the logged-in user. Each entry can be deleted individually.

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Register a new account, log in, and start practicing!
