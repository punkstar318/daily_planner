const request = require('supertest');
const app = require('../src/index');

jest.mock('../src/db', () => ({
    query: jest.fn()
}));
const db = require('../src/db');

describe('notes routes', () => {
    beforeEach(() => db.query.mockReset());

    test('GET /api/notes returns rows from db', async () => {
        db.query.mockResolvedValue({ rows: [{ id: 1, title: 'a', content: 'b' }] });
        const res = await request(app).get('/api/notes');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ id: 1, title: 'a', content: 'b' }]);
    });
});
