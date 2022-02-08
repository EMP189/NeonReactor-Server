const express = require('express');
const router = express.Router();

const Player = require('../models/players');


// Top 10 players for leasderboard 
router.get('/', async (req,res) => {
    try {
        const players = await Player.all
        res.status(200).send(players)
    } catch (err) {
        res.status(404).send({ err })
    }
})

// adding a player only (not adding score)

router.post('/', async (req,res) => {
    try {
        const newPlayer = await Player.create(req.body.username)
        res.status(201).send(newPlayer)
    }
    catch (err) {
        res.status(409).send({ err })
    }
})

// find a player 
router.get('/:username', async (req,res) => {
    try {
        const player = await Player.findByUsername(req.params.username)
        res.status(200).send(player)
    } catch (err) {
        res.status(404).send({ err })
    }
})

// update of players score 
router.patch('/:username', async (req,res) => {
    try {
        const player = await Player.update(req.params.username, req.body.score)
        res.status(204)
    } catch (err) {
        res.status(409).send({ err })
    }
})

module.exports = router