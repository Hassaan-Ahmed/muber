const assert = require('assert');
const app = require('../../app');
const request = require('supertest');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
describe('Creating a test setup for controllers', () => {

    xit('check if the post route is working', (done) => {
        Driver.estimatedDocumentCount().then((count) => {

            request(app)
                .post('/api/drivers')
                .send({email: 'test@test.com'})
                .end(() => {
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

    it.only('get to /api/drivers find drivers around a specific location', (done) => {
        const seattleDriver = new Driver ({
            email: 'seattle@test.com',
            geometry: { 
                type: 'Point',
                coordinates: [-122.4759902, 47.6147628 ],
                name: 'Sea',
                category: 'Medical',
         },
        });
        const miamiDriver = new Driver ({
            email: 'miami@test.com',
            geometry: { 
                type: 'Point',
                coordinates: [-80.251, 25.791 ],
                name: 'Miami',
                category: 'Medical',
         },
        });

        Promise.all([seattleDriver.save(), miamiDriver.save()])
        .then(() => {
            request(app)
            .get('/api/drivers?lng=-80.2&lat=25.79')
            .end((error,response) => {
                console.log('response',response);
                done();
            });
        });
    });
});