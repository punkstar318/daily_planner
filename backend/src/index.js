const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// routes
const notesRouter = require('./routes/notes');
const tasksRouter = require('./routes/tasks');
const eventsRouter = require('./routes/events');

// start express app
const app = express();
app.use(cors());

// middleware
app.use(bodyParser.json());

app.use('/api/notes', notesRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/events', eventsRouter);

// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;

// Only start server when this file is run directly. Export `app` for tests.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;