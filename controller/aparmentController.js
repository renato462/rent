const Aparment = require('../model/aparment');
const { ITEMS_PER_PAGE} = require('../config/index.js');

exports.getApaments = (req, res, next) => {
    const page = req.query.page;
    let aparmentTotal;
    Aparment.countDocuments().then((count) => {
        aparmentTotal = count;
        return Aparment.find()
        .skip((page - 1)*Number(ITEMS_PER_PAGE))
        .limit(Number(ITEMS_PER_PAGE))
    })
    .then(aparments => {
        
       res.render('./aparment/aparments', {
        aparments: aparments,
        pageTitle: 'Aparments',
        path: '/aparments',
        aparmentTotal: aparmentTotal,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < aparmentTotal,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(aparmentTotal / ITEMS_PER_PAGE)
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