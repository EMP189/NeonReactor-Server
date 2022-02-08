const express = require('express');

const server = express();
server.use(express.json());

const cors = require('cors');

server.use(cors('*'));
server.use(express.json());

const playerRoutes = require('./controllers/players');

server.use('/players', playerRoutes);

server.get('/', (req, res) => res.json({ message: 'Welcome to the Quiz'}));

module.exports = server;