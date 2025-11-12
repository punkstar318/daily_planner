const express = require('express');
const router = express.Router();
const db = require('../db');

// Assumptions: an `events` table exists with at least (id, title, event_date, description) columns.

router.get('/', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM events ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { title = '', event_date = null, description = '' } = req.body || {};
        const result = await db.query(
            'INSERT INTO events(title, event_date, description) VALUES($1, $2, $3) RETURNING *',
            [title, event_date, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, event_date, description } = req.body || {};
        const result = await db.query(
            'UPDATE events SET title = COALESCE($1, title), event_date = COALESCE($2, event_date), description = COALESCE($3, description) WHERE id = $4 RETURNING *',
            [title, event_date, description, id]
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
        const result = await db.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;


