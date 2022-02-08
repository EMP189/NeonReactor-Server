const express = require('express');
const router = express.Router();

const Player = require('../models/players');


// Top 10 players for leasderboard 
router.get('/', async (req,res) => {
    try {
        const players = await Player.all
        console.log(players);
        res.json(players)
        res.status(200).send()
    }
    catch (err) {
        res.status(404).send({ err })
    }
})

// adding a player only (not adding score)

router.post('/', async (req,res) => {
    try {
        const players = await Player.create(req.body.username)
        res.status(201).send(players)
    }
    catch (err) {
        res.status(409).send({ err })
    }
})

// find a player 
router.get('/:username', async (req,res) => {
    try {
        const players = await Player.findByUsername(req.params.username)
        res.status(200).send(players)
      }
    catch (err) {
        res.status(404).send({ err })
    }
})

// update of players score 
router.patch('/:username', async (req,res) => {
    try {
        const players = await Player.update(req.params.username, req.body.score)
        res.status(204).send(players)
    }
   catch (err) {
       res.status(409).send({ err })
   }
})

module.exports = router