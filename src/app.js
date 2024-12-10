require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const barberShopRoutes = require('./routes/barberShopRoutes');
const userRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./config/swagger');


const app = express();
connectDB();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/barbershops', barberShopRoutes);

swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
