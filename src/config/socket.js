const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

module.exports = {
  init: (server) => {
    io = socketIo(server, {
      cors: {
        origin: '*', // Permitir conexões de qualquer origem
      },
    });

    // Middleware para verificar o token
    io.use((socket, next) => {
      try {
        // Extrair o token do cabeçalho Authorization
        const token = socket.handshake.headers['authorization']?.split(' ')[1];

        if (!token) {
          return next(new Error('Token não fornecido'));
        }

        // Verificar o token JWT
        jwt.verify(token, 'sua-chave-secreta', (err, decoded) => {
          if (err) {
            return next(new Error('Token inválido'));
          }

          // Associar os dados do usuário ao socket
          socket.user = decoded;
          next();
        });
      } catch (error) {
        next(new Error('Erro no middleware de autenticação'));
      }
    });

    // Eventos do Socket.IO
    io.on('connection', (socket) => {
      console.log('Novo cliente conectado:', socket.id);

      // Exemplo: Acessar dados do usuário autenticado
      console.log('Usuário conectado:', socket.user);

      socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
      });
    });

    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error('Socket.io não inicializado!');
    }
    return io;
  },
};
