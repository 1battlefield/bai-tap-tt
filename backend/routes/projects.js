// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET project by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create project
router.post('/', async (req, res) => {
  const { name, description, client, start_date, end_date, image_url } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO projects (name, description, client, start_date, end_date, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, client || null, start_date || null, end_date || null, image_url || null]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      description,
      client,
      start_date,
      end_date,
      image_url
    });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  const { name, description, client, start_date, end_date, image_url } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE projects SET name = ?, description = ?, client = ?, start_date = ?, end_date = ?, image_url = ? WHERE id = ?',
      [name, description, client || null, start_date || null, end_date || null, image_url || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ id: req.params.id, name, description, client, start_date, end_date, image_url });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;