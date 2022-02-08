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
        res.status(500).send({ err })
    }
})

// adding a player only (not adding score)

router.post('/', async (req,res) => {
    try {
        const players = await Player.create(req.body.username)
        res.status(201).send(players)
    }
    catch (err) {
        res.status(500).send({ err })
    }
})

// find a player 
router.get('/:username', async (req,res) => {
    try {
        const players = await Player.findByUsername(req.body.username)
        res.json(players)
        res.status(200).send()
      }
    catch (err) {
        res.status(500).send({ err })
    }
})

// update of players score 
router.patch('/:username', async (req,res) => {
    try {

        const players = await Player.update(req.body.username, req.body.score)
        res.status(204).send()
    }
    catch (err) {
        res.status(500).send({ err })
    }

})

module.exports = router