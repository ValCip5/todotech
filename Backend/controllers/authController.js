const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
  try {
    const { username, name, surname, email, password } = req.body;

    // Verificar si el user ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear user
    const user = await User.create({
      username,
      name,
      surname,
      email,
      password: hashedPassword });

    // Generar JWT
    const token = generateToken(user);
    res.status(201).json({ message: 'Usuario registrado', token });
  } catch (error) {
    console.log('Error: ' + error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = generateToken(user);
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.log('Error: ' + error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const verify = (req, res) => {
  res.json(req.user);
};

module.exports = { register, login, verify };