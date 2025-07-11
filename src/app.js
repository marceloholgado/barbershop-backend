require('dotenv').config();
const http = require('http'); // Importação do módulo HTTP
const express = require('express');
const connectDB = require('./config/database');
const barberShopRoutes = require('./routes/barberShopRoutes');
const userRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./config/swagger');
const socket = require('./config/socket'); // O arquivo de configuração do Socket.IO

const app = express(); // Certifique-se de que `app` seja inicializado antes de criar o servidor
connectDB();

// Criação do servidor HTTP
const server = http.createServer(app);

// Inicialização do Socket.IO com o servidor
const io = socket.init(server);

app.use(express.json());
app.use('/api/trimbook', userRoutes);
app.use('/api/trimbook', barberShopRoutes);

swaggerDocs(app);

const PORT = process.env.PORT || 5000;

// Use `server.listen` para iniciar o servidor
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
