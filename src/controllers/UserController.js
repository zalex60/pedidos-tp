const User = require('../model/User');
const passport = require('passport');

//Retorna la vista de registro
exports.registro = (request, response) => {
    response.render('users/registro');
}

//Guarda el registro del usuario
exports.store = async (request, response) => {
    const { nombre, email, password, password_confirm } = request.body;
    const errores = [];
    //Inicia validaciones de campos
    if (!nombre) errores.push({ text: 'Por favor inserta el nombre' });
    if (!email) errores.push({ text: 'Por favor inserta el email' });
    if (!password) errores.push({ text: 'Por favor inserta el password' });
    if (password < 4) errores.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
    if (password != password_confirm) errores.push({ text: 'El password no coinciden' });
    //Fin de validaciones

    if (errores.length > 0) {
        response.render('users/registro', { errores, nombre, email, password, password_confirm });
    } else {
        //Se busca usuario mediante email
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            errores.push({ text: 'El email ya esta en uso, por favor elija uno nuevo' });
            response.render('users/registro', { errores, nombre, email, password, password_confirm });
        } else {
            const newUser = new User({
                nombre, email, password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save()
                .then(() => {
                    request.flash('success_msg', 'Usuario registrado correctamente');
                    response.redirect('login');
                })
                .catch((error) => {
                    console.log(error);
                    response.redirect('/error')
                })
        }
    }
}

//Vista de login
exports.login = (request, response) => {
    response.render('users/login');
}

//Authentificación
exports.auth = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: `/login`,
    failureFlash: true
})

//Cerrar sesión
exports.logout = (request, response, next) => {
    request.logout(function (err) {
        if (err) { return next(err); }
        response.redirect('/');
    });
}