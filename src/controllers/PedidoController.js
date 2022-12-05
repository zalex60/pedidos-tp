const Pedido = require('../model/Pedido');
const Marca = require('../model/Marca');
const Producto = require('../model/Producto');
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
	var pedidoMap = {}; 
	Pedido.find({}, function(err, pedidos) {
		var pedidosMap = {};
		pedidos.forEach(function(pedido) {
			pedidoMap[pedido._id] = pedido;
		});
	})
	Producto.find({}, function(err, productos) {
		var productoMap = {};
		productos.forEach(function(producto) {
			productoMap[producto._id] = producto;
			productoMap[productos] = JSON.stringify(producto.pedidos);
		});
		response.render('pedidos/index',{productoMap,marcaMap,pedidoMap});
	});
}

exports.marcas = (request, response) => {

}

exports.store = async(request, response)=>{
	let productos=JSON.parse(request.body.productosListado);
	const fecha = new Date();
	const folio = Math.random(5);
	console.log(folio)
	console.log(fecha)
	const newPedido = new Pedido({
		fecha,folio,productos
	});
	await newPedido.save()
	.then(() => {
		request.flash('success_msg', 'Pedido registrada correctamente');
		response.redirect('/pedidos');
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