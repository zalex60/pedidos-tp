const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    marca_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

module.exports = mongoose.model('Producto', ProductoSchema);