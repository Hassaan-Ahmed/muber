const Driver = require('../model/driver');

module.exports = {
    greeting(req,res) {
        res.send({hi: 'there'});
    },

    create(req, res, next) {
        const driverProps = req.body;
        Driver.create(driverProps)
        .then((driver) => res.send(driver))
        .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findOneAndUpdate({_id: driverId }, driverProps)
        .then(() => Driver.findOne({ _id: driverId }))
        .then((driver) => res.send(driver))
        .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndDelete({_id: driverId})
        .then((driver) => res.status(204).send(driver))
        .catch(next);
    },

    index( req, res, next) {
        const { lng, lat } = req.query;
        // Driver.find(
        //     {
        //             geometry: {
        //                type : "Point",
        //                coordinates : [parseFloat(lng), parseFloat(lat)]
        //             },
        //          }
        //  )
        // Driver.find( { loc: { $geoWithin: { $centerSphere: [parseFloat(lng), parseFloat(lat)] } } } )
        Driver.find({ geometry :
            { $geoWithin :
                { $geometry :
                  { type : "Polygon" ,
                    coordinates : [parseFloat(lng), parseFloat(lat)]
           } } } } )
            .then((drivers) => res.send(drivers))
            .catch(next);
    }
};