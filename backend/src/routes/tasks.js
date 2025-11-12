const express = require('express');
const router = express.Router();
const db = require('../db');

// Assumptions: a `tasks` table exists with at least (id, title, completed) columns.

router.get('/', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM tasks ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { title = '', completed = false } = req.body || {};
        const result = await db.query(
            'INSERT INTO tasks(title, completed) VALUES($1, $2) RETURNING *',
            [title, completed]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body || {};
        const result = await db.query(
            'UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
            [title, completed, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;


