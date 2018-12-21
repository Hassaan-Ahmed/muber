const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
    type: { type: String, default:'Point'},
    name: {type: String},
    category: {type: String},
    coordinates: { type: [Number], createIndexes: '2dsphere'}
}); 
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
    geometry: PointSchema 
});
const Driver  =  mongoose.model('driver', DriverSchema);
module.exports = Driver;