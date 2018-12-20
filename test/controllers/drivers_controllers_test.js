const assert = require('assert');
const app = require('../../app');
const request = require('supertest');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
describe('Creating a test setup for controllers', () => {

    it('check if the ppst route is working', (done) => {
        Driver.count().then((count) => {

            request(app)
                .post('/api/create')
                .send({email: 'test@test.com'})
                .end((error, response) => {
                    Driver.count().then((newCount) => {
                        assert(count + 1 === newCount);
                        done();
                    });                    
                });
                
        });        
    });
});