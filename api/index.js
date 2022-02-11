const app = require('./server');
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ['http://localhost:3000','https://neon-quiz.netlify.app/']
  }
})
const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`Listening at http://localhost:${port}`));

io.on('connection', socket => {
  socket.on('join-room', (room, username) => {
    socket.join(room);
    socket.to(room).emit('user-join', username);
  });

  socket.on('start-game', (room, diff, qnum, quiz) => {
    socket.to(room).emit('init-game', diff, qnum, quiz)
  });

  socket.on('end-game', (room, username, score) => {
    socket.to(room).emit('end-results', username, score);
  });
});