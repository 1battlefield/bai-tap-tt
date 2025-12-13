// backend/routes/services.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all services
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET service by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Service not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching service:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create service
router.post('/', async (req, res) => {
  const { name, description, icon } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO services (name, description, icon) VALUES (?, ?, ?)',
      [name, description, icon || null]
    );
    res.status(201).json({ id: result.insertId, name, description, icon });
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  const { name, description, icon } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE services SET name = ?, description = ?, icon = ? WHERE id = ?',
      [name, description, icon || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ id: req.params.id, name, description, icon });
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM services WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;