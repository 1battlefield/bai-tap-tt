// backend/routes/team.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all team members
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM team_members ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching team members:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create team member
router.post('/', async (req, res) => {
  const { name, position, bio, avatar_url } = req.body;
  if (!name || !position) {
    return res.status(400).json({ error: 'Name and position are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO team_members (name, position, bio, avatar_url) VALUES (?, ?, ?, ?)',
      [name, position, bio || null, avatar_url || null]
    );
    res.status(201).json({ id: result.insertId, name, position, bio, avatar_url });
  } catch (err) {
    console.error('Error creating team member:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update team member
router.put('/:id', async (req, res) => {
  const { name, position, bio, avatar_url } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE team_members SET name = ?, position = ?, bio = ?, avatar_url = ? WHERE id = ?',
      [name, position, bio || null, avatar_url || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Team member not found' });
    res.json({ id: req.params.id, name, position, bio, avatar_url });
  } catch (err) {
    console.error('Error updating team member:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE team member
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Team member not found' });
    res.json({ message: 'Team member deleted successfully' });
  } catch (err) {
    console.error('Error deleting team member:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;