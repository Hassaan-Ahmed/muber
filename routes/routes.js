const driver = require('../controllers/drivers_controller');
module.exports = (app) => {
    app.get('/api', (req,res) => {
        driver.greeting(req,res);
    });
}