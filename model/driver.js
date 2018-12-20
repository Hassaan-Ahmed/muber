const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    email: {
        type: String,
        required: true,
        message: 'email is required'
    },
    driving: {
        type: Boolean,
        default: false,
    },
    // location: 
});
const Driver  =  mongoose.model('driver', DriverSchema);
module.exports = Driver;