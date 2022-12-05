const Producto = require('../model/Producto');
const Marca = require('../model/Marca');
const { request } = require('express');

//Retorna la vista de marcas
exports.index = (request, response) => {
  var marcaMap =[] 
  Marca.find({}, function(err, marcas) {
    marcaMap = {};
    marcas.forEach(function(marca) {
      marcaMap[marca._id] = marca;
      });
      
    });  
    Producto.find({}, function(err, productos) {
    var productoMap = {};
    productos.forEach(function(producto) {
      productoMap[producto._id] = producto;
    });
    response.render('catalogos/productos/index',{productoMap,marcaMap});
  });
}

exports.marcas = (request, response) => {
    
}

exports.store = async(request, response)=>{
  console.log(request.body)
  //console.log(request)
    const { nombre,precio,marca_id} = request.body;
    const errores = [];
    //Inicia validaciones de campos
    if (!nombre) errores.push({ text: 'Por favor inserta el nombre' });
    if (!precio) errores.push({ text: 'Por favor inserta el precio' });
    if (!marca_id) errores.push({ text: 'Por favor inserta el precio' });
    const newProducto = new Producto({
        nombre,precio,marca_id
    });
    await newProducto.save()
    .then(() => {
      request.flash('success_msg', 'Producto registrada correctamente');
      response.redirect('/productos');
    })
    .catch((error) => {
      console.log(error);
        
    })
}

exports.update = async(req, response,id)=>{
  let doc = await Marca.findOneAndUpdate(id, req.body, {
    new: true,
    upsert: true,
    rawResult:true
  });
  req.flash('success_msg', 'Marca editada correctamente!');
  response.redirect('/marcas');
}