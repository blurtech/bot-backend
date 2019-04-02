var chai = require('chai');
var should = chai.should();
var request = require('supertest');
var app = require('../app');

describe('Messages Route', function() {
    it('responds with status 200', async () => {
        await request(app)
            .post('/api/messages')
            .send({message: 'Привет'})
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {success: true,
                data: {
                    message: "Привет. Я бот NUCKles!"
                }});
    });
    it('responds with success true', async () => {
        await request(app)
            .post('/api/messages')
            .send({message: 'Привет'})
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect({
                "success": true,
                "data": {
                    "message": "Привет. Я бот NUCKles!"
                }
            });
    });
});