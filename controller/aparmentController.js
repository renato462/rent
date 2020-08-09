const Aparment = require('../model/aparment');
const Property = require('../model/property');

const {ITEMS_PER_PAGE} = require('../config/index.js');

exports.getAddAparment = (req, res, next) => {
    Property.find()
    .then(properties => {
        res.render('./aparment/crudAparment',{
            properties: properties
        });
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }); 
};

exports.getApaments = (req, res, next) => {
    const page = +req.query.page || 1;
    let aparmentTotal;
    Aparment.countDocuments().then((count) => {
        aparmentTotal = count;
        return Aparment
        .find()
        .populate('propertyId')
        .skip((page - 1)*Number(ITEMS_PER_PAGE))
        .limit(Number(ITEMS_PER_PAGE))
    })
    .then(aparments => {
       res.render('./aparment/aparments', {
        aparments: aparments,
        pageTitle: 'Aparments',
        path: '/aparments',
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < aparmentTotal,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        totalPagination: Math.ceil(aparmentTotal / ITEMS_PER_PAGE),
        numerOfItem: ITEMS_PER_PAGE*(page) - ITEMS_PER_PAGE,  
       });    
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.getEditAparment = (req, res, next) => {
    const aparmentId = req.params.aparmentId;
    const editMode = req.query.edit;
    let properties;
    Property.find()
    .then( result => {
        properties = result;
        return Aparment.findById(aparmentId)
        .populate('propertyId')
    })
    .then( aparment => {
        // let numberFormat = new Intl.NumberFormat("en-US", {minimumFractionDigits:2}).format(+aparment.price);
        // console.log(numberFormat);
        res.render('./aparment/crudAparment',{
            aparment: aparment,
            editMode: editMode,
            properties: properties,
            path: '/aparments/edit/' 
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    })

};

exports.postAddAparment = (req, res, next) =>{
    const code = req.body.code;
    const price = req.body.price;
    const propertyId = req.body.propertyId;
    const floor = req.body.floor;

    Aparment.create(
        {
            code: code,
            price: price,
            floor: floor,
            propertyId: propertyId
        }
    )
    .then((result) => {
        res.redirect('/aparments');
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.postEditAparment = (req,res, next) => {
    
    const aparmentId = req.body.aparmentId;
    const code = req.body.code;
    const price = req.body.price;
    const propertyId = req.body.propertyId;
  
    Aparment.findByIdAndUpdate(aparmentId,{
        price: price,
        code: code,
        propertyId: propertyId
    })
    .then( aparment => {
        res.redirect('/aparments');
    })
    .catch(error =>{
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    })
};







exports.getJsonApaments = (req, res, next) => {
    Aparment.find()
    .then(aparments => {
        res.status(200).json({aparments: aparments});
        })    
    };

exports.postJsonAddAparment = (req, res, next) =>{
    const code = req.body.code;
    const price = req.body.price;
    const aparment = new Aparment({
        code: code,
        price: price
    })
    .save()
    .then((result) => {
        res.status(200).json({message: 'Departamento Creado'})
    })
    .catch((err) => {
        res.status(500).json({message: 'Fallo la creacion del cliente intente de nuevo'});
    });
};