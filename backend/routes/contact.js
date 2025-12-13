// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST contact message
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO contact_messages (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, email, phone || null, message]
    );
    res.status(201).json({ id: result.insertId, name, email, phone, message });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// (Optional) GET all contact messages
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;