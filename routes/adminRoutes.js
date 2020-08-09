const express = require('express');

const clientController = require('../controller/clientController');
const propertyController = require('../controller/propertyController');
const aparmentController = require('../controller/aparmentController');
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
router.get('/edit-property/:propertyId', propertyController.getEditProperty);

// Admin Crear Property (propiedad) => POST /adminRouter
router.post('/add-property', propertyController.postAddProperty);
router.post('/delete-property', propertyController.postDeleteProperty);

// Admin Aparment routes => GET 
router.get('/aparments', aparmentController.getApaments);
router.get('/aparment-json', aparmentController.getJsonApaments);
router.get('/add-aparment', aparmentController.getAddAparment);
router.get('/edit-aparment/:aparmentId', aparmentController.getEditAparment);

// Admin Aparment routes => POST 
router.post('/add-aparment', aparmentController.postAddAparment);
router.post('/edit-aparment', aparmentController.postEditAparment);

module.exports = router;



