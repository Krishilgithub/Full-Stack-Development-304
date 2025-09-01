const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure your email credentials here
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'krishilagrawal026@gmail.com', // Replace with your email
    pass: ''      // Replace with your app password
  }
});

function validateForm({ name, email, message }) {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!name || name.length < 2) return 'Name is required.';
  if (!email || !emailRegex.test(email)) return 'Valid email is required.';
  if (!message || message.length < 10) return 'Message must be at least 10 characters.';
  return null;
}

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  const error = validateForm({ name, email, message });
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }
  try {
    await transporter.sendMail({
      from: email,
      to: 'your.email@gmail.com', // Replace with your email
      subject: `Portfolio Contact from ${name}`,
      text: message
    });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
