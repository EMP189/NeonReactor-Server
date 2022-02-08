const app = require('./server');
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})
const port = process.env.PORT || 8080;
const axios = require('axios');

server.listen(port, () => console.log(`Listening at http://localhost:${port}`));

io.on('connection', socket => {
  socket.on('join-room', (room, username) => {
    socket.join(room);
    socket.to(room).emit('user-join', username);
  });

  socket.on('start-game', (room, amount, category, difficulty) => {
    axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(response => socket.in(room).emit('init-game', response))
    .catch(error => socket.in(room).emit('init-error', error));
  });

  socket.on('end-game', (room, username, score) => {
    socket.to(room).emit('end-results', username, score);
  });
});