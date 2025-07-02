const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const axios = require('axios');

// Firebase Admin setup
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express(); // ✅ Make sure this comes before any app.post()
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyA3mwVPJ-o6a7zE5Gbjn-0hxHq3lEd45uI";

// /verify route
app.post('/verify', async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (decoded.email !== 'ayushpurnia919@gmail.com') {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ success: false, error: 'Invalid token', details: err.message });
  }
});

// /ask-ayush route
app.post('/ask-ayush', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'No question provided' });

  try {
    const cohereRes = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        model: "command-r-plus",
        message: question
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    const answer = cohereRes.data.text || "Sorry, I couldn't answer that.";
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'Cohere error', details: err.message });
  }
});

// Contact form route
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact from ${name}: ${message} (${email})`);
  res.json({ success: true });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
