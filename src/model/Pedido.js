const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const PedidoSchema = new Schema({
    fecha: {
        type: String,
        required: true
    },
    folio: {
        type: String,
        required: true
    },
    productos: {
        type: Array,
        required: true
    },
    
});

module.exports = mongoose.model('Pedido', PedidoSchema);