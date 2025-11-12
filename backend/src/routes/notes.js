const express = require('express');
const router = express.Router();
const db = require('../db');

// Assumptions: a `notes` table exists with at least (id, title, content) columns.

router.get('/', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM notes ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM notes WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { title = '', content = '' } = req.body || {};
        const result = await db.query(
            'INSERT INTO notes(title, content) VALUES($1, $2) RETURNING *',
            [title, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body || {};
        const result = await db.query(
            'UPDATE notes SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *',
            [title, content, id]
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
        const result = await db.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

