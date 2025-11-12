const request = require('supertest');
const app = require('../src/index');

jest.mock('../src/db', () => ({
    query: jest.fn()
}));
const db = require('../src/db');

describe('tasks routes', () => {
    beforeEach(() => db.query.mockReset());

    test('GET /api/tasks returns rows from db', async () => {
        db.query.mockResolvedValue({ rows: [{ id: 1, title: 'task', completed: false }] });
        const res = await request(app).get('/api/tasks');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ id: 1, title: 'task', completed: false }]);
    });
});
