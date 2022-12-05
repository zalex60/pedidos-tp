const express = require('express');
const router = express.Router();
const MarcaController = require('../controllers/MarcaController');
const ProductoController = require('../controllers/ProductoController');

//////////Marcas
//Vista de marcas
router.get(`/marcas`, MarcaController.index);
router.get(`/marcas/collection`, MarcaController.marcas);
router.post(`/marcas/store`, MarcaController.store);
router.post(`/marcas/update/:id`, MarcaController.update);
///////////////
////////Productos
router.get(`/productos`, ProductoController.index);
router.get(`/marcas/collection`, MarcaController.marcas);
router.post(`/productos/store`, ProductoController.store);
router.post(`/marcas/update/:id`, MarcaController.update);
//////////////
module.exports = router;