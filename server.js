// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage
const submissions = [];

// Handle form POST submission
app.post('/submit', (req, res) => {
  const { name, message } = req.body;
  submissions.push({ name, message });

  // Respond with thank you and list of messages
  let html = `
    <h1>Thank you for your submission!</h1>
    <h2>All Messages:</h2>
    <ul>
  `;
  for (const entry of submissions) {
    html += `<li><strong>${entry.name}:</strong> ${entry.message}</li>`;
  }
  html += `</ul><a href="/">Go Back</a>`;
  res.send(html);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
