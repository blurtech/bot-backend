let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('GET /api/v1/messages/greetings', () => {
    it('should respond "Hello!"', (done) => {
        chai.request(app)
            .get('/api/v1/messages/greetings')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);
                // there should be a 200 status code
                res.status.should.equal(200);
                // the response should be JSON
                res.type.should.equal('application/json');
                // the JSON response body should have a
                // key-value pair of {"status": "success"}
                res.body.success.should.eql('true');
                // the JSON response body should have a
                // key-value pair of {"data": 1 user object}
                res.body.data[0].should.include.keys(
                    'message'
                );
                done();
            });
    });
});