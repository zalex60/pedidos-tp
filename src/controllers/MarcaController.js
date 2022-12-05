const Marca = require('../model/Marca');
const User = require('../model/User');
const passport = require('passport');
const { request } = require('express');

//Retorna la vista de marcas
exports.index = (request, response) => {
  Marca.find({}, function(err, marcas) {
    var marcaMap = {};
    marcas.forEach(function(marca) {
      marcaMap[marca._id] = marca;
    });
    response.render('catalogos/marcas/index',{marcaMap});
  });
}

exports.marcas = (request, response) => {
  Marca.find({}, function(err, marcas) {
    var marcaMap = {};
    marcas.forEach(function(marca) {
      marcaMap[marca._id] = marca;
    });
    response.send(marcaMap);
  });   
}

exports.store = async(request, response)=>{
  //console.log(request)
    const { nombre} = request.body;
    const errores = [];
    //Inicia validaciones de campos
    if (!nombre) errores.push({ text: 'Por favor inserta el nombre' });
    const newMarca = new Marca({
        nombre
    });
    await newMarca.save()
    .then(() => {
      request.flash('success_msg', 'Marca registrada correctamente');
      response.redirect('/marcas');
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