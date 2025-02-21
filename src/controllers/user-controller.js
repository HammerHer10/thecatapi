const User = require('../models/user-model'); // Importamos el modelo de usuario
const mongoose = require('mongoose');

// Registro de usuario
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario y guardarlo en MongoDB
        const newUser = new User({
            name,
            email,
            password // 🚨 En producción, usa bcrypt para encriptar la contraseña
        });

        const savedUser = await newUser.save();

        // Enviar respuesta con éxito y los datos registrados
        res.status(201).json({
            message: '✅ Registrado con éxito',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '❌ Error al registrar el usuario' });
    }
};

// Login de usuario
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: '❌ Usuario no encontrado' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: '❌ Contraseña incorrecta' });
        }

        res.status(200).json({
            message: '✅ Login exitoso',
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '❌ Error al iniciar sesión' });
    }
};

module.exports = { registerUser, loginUser };
