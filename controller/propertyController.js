const Property = require('../model/property');

exports.getProperties = (req, res, next) => {
    Property.find().then(properties => {
        res.render('property/properties',{
            properties: properties,
            editing: false,
            hasProperties: properties.length>0,
        });
    }).catch(error => console.log(error));
};

exports.getAddProperty = (req, res, next)=>{
    res.render('property/add_update_property',{
        editMode: false,
    });
}

exports.postAddProperty = (req, res, next) => {
   const adressNickname = req.body.adressNickname;
   const adress = req.body.adress;
   const UserId = req.user;

   const property = new Property({
    adressNickname: adressNickname,
    adress: adress, 
    UserId: UserId,
    aparment: []
   }
)
   .save().then(result => {console.log(result)}).catch(error => console.log(error));
    res.redirect('/properties');
};