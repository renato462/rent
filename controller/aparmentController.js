const Aparment = require('../model/aparment');

exports.getApaments = (req, res, next) => {
    Aparment.find()
    .then(aparments => {
        res.render('./aparment/aparments', {
            aparments: aparments,
        });    
    })
};

exports.getJsonApaments = (req, res, next) => {
    Aparment.find()
    .then(aparments => {
        res.status(200).json({aparments: aparments});
        })    
    };

exports.postAddAparment = (req, res, next) =>{
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