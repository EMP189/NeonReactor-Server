const express = require('express');
const router = express.Router();

const Player = require('../models/players');

router.get('/', async (req,res) => {
    try {
        const players = await Player.all
        res.json(players)
        res.status(200).send()
    }
    catch (err) {
        res.status(500).send({ err })
    }
})

router.post('/', async (req,res) => {
    try {
        const players = await Player.create(req.body.username )
        res.status(201).send(players)
    }
    catch (err) {
        res.status(500).send({ err })
    }
})


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

router.patch('/:username', async (req,res) => {
    try {

        const players = await Player.update(req.body.username)
        res.status(204).send()
    }
    catch (err) {
        res.status(500).send({ err })
    }

})

module.exports = router