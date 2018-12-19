const app = require('../app');
const request = require('supertest');
const assert = require('assert');

describe('The express app', () => {
    it('should test if the api is working or not', (done) =>  {
        request(app)
            .get('/api')
            .end((error, response) => {
                assert(response.body.hi === 'there');
                done();
            });
    });
});
