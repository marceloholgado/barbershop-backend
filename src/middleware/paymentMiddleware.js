const Payment = require('../models/payment');

const paymentMiddleware = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({ barberShopId: req.user.id }).sort({ dueDate: -1 });
    if (!payment || payment.status !== 'paid') {
      return res.status(403).json({ message: 'Plano inativo. Regularize o pagamento.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar pagamento', error });
  }
};

module.exports = paymentMiddleware;
const paymentMiddleware = require('../middleware/paymentMiddleware');
router.post('/', authMiddleware, paymentMiddleware, createBarberShop);
