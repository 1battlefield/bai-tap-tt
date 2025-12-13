// backend/routes/jobs.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM jobs ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create job
router.post('/', async (req, res) => {
  const { title, description, requirements, location, salary } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO jobs (title, description, requirements, location, salary) VALUES (?, ?, ?, ?, ?)',
      [title, description, requirements || null, location || null, salary || null]
    );
    res.status(201).json({ id: result.insertId, title, description, requirements, location, salary });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update job
router.put('/:id', async (req, res) => {
  const { title, description, requirements, location, salary } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE jobs SET title = ?, description = ?, requirements = ?, location = ?, salary = ? WHERE id = ?',
      [title, description, requirements || null, location || null, salary || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ id: req.params.id, title, description, requirements, location, salary });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;