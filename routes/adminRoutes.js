const express = require('express');

const clientController = require('../controller/clientController');
const propertyController = require('../controller/propertyController');
const router = express.Router();

// Admin Crear Cliente => GET /admin

router.get('/add-client', clientController.getAddClient);
router.get('/clients', clientController.getClients);
router.get('/edit-client/:clientId', clientController.getEditClient);


// Admin Crear Cliente => POST /admin

router.post('/add-client', clientController.postAddClient);
router.post('/edit-client', clientController.postEditClient);
router.post('/delete-client',clientController.postDeleteClient);

// Admin Crear Property (propiedad) => GET /admin
router.get('/properties',propertyController.getProperties);
router.get('/add-property', propertyController.getAddProperty);

// Admin Crear Property (propiedad) => POST /adminRouter

router.post('/add-property', propertyController.postAddProperty);

module.exports = router;



