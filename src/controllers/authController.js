const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Certifique-se de que o modelo de User está correto

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Verifica se o e-mail já está cadastrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Cria um novo usuário com a senha criptografada
    const user = new User({ name, email, password });
    await user.save();

    // Cria o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    // Retorna o token
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no registro', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verifica se a senha fornecida é correta
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Cria o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Retorna o token JWT
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error: error.message });
  }
};