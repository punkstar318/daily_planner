const request = require('supertest');
const app = require('../src/index');

jest.mock('../src/db', () => ({
    query: jest.fn()
}));
const db = require('../src/db');

describe('events routes', () => {
    beforeEach(() => db.query.mockReset());

    test('GET /api/events returns rows from db', async () => {
        db.query.mockResolvedValue({ rows: [{ id: 1, title: 'meet', event_date: '2025-01-01', description: 'x' }] });
        const res = await request(app).get('/api/events');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ id: 1, title: 'meet', event_date: '2025-01-01', description: 'x' }]);
    });
});
