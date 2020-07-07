const Property = require('../model/property');

exports.getProperties = (req, res, next) => {
    Property.find().then(properties => {
        const number =[];
        for (let i =0; i < properties.length; i++){
          number[i] = i;
        };
        res.render('property/properties',{
            properties: properties,
            editing: false,
            hasProperties: properties.length>0,
            number: number
        });
    }).catch(error => console.log(error));
};