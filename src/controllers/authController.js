const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Certifique-se de que o modelo de User está correto
const BarberShop = require('../models/barberShop');

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
  try {
    const { email, password } = req.body;

    // Verifique se o e-mail foi fornecido
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    // Verifique se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verifique se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Defina o tempo de expiração do token
    });

    // Buscar a barbearia associada ao usuário
    const barberShop = await BarberShop.findOne({ ownerId: user._id }).populate('barbers');

    if (!barberShop) {
      return res.status(200).json({
        message: 'Login bem-sucedido!',
        requiresBarberShop: true,
        token: token
      });
    }

    // Retornar o token e os dados da barbearia
    res.status(200).json({
      message: 'Login bem-sucedido',
      token: token,
      barberShop: barberShop,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
};