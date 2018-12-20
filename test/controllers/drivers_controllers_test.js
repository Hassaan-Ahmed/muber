const assert = require('assert');
const app = require('../../app');
const request = require('supertest');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
describe('Creating a test setup for controllers', () => {

    it('check if the ppst route is working', (done) => {
        Driver.estimatedDocumentCount().then((count) => {

            request(app)
                .post('/api/drivers')
                .send({email: 'test@test.com'})
                .end((error, response) => {
                    Driver.estimatedDocumentCount().then((newCount) => {
                        assert(count + 1 === newCount);
                        done();
                    });                    
                });
                
        });        
    });

    it('should check if the update route is working or not', (done) => {
        const driver = new Driver({email:'t@t.com'})
        driver.save()
        .then(() => {
            request(app)
            .put(`/api/drivers/${driver._id}`)
            .send({ driving: true })
            .end(() => {
                Driver.findOne({email:'t@t.com'})
                .then((driver) => {
                    assert(driver.driving === true );
                    done();            
                });                       
            
            });
        });
    });

    it('should hit delete route and reuturn the result', (done) => {
        const driver = new Driver({email: 't@t.com'})
        driver.save()
        .then(() => {
            request(app)
            .delete(`/api/drivers/${driver._id}`)
            .end(() => {
               Driver.findOne({email: 't@t.com'})
               .then((driver) => {
                   assert(driver === null);
                   done();
               })                
            });
        });
    });
});