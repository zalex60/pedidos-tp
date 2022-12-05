const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

//Vista de registro
router.get(`/pedidos`, PedidoController.index);
router.post(`/pedidos/store`, PedidoController.store);

module.exports = router;