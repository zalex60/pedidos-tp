const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const MarcaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Marca', MarcaSchema);