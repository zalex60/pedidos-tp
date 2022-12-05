const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

//Vista de registro
router.get(`/registro`, UserController.registro);
//Guarda el registro
router.post(`/registro`, UserController.store);

//Vista de login
router.get(`/login`, UserController.login);
//Inicia la authentificación
router.post(`/login`, UserController.auth);

//Cerrar sesión
router.get('/logout', UserController.logout);

module.exports = router;