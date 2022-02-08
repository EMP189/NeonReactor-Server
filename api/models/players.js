const {init} = require ('../db_Config')
const { ObjectId } = require('mongodb')

module.exports = class Player {

    constructor(data){
        this.id = data.id
        this.username = data.username
        this.score = data.score
    }
    // Top 10 players for leaderboard 
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const playersData = await db.collection('players').find().limit(10).toArray()
                const players = playersData.map(p => new Player({...p, id: p._id}))
                resolve(players);
            }
            catch (err ) {
                console.log(err);
                reject("Error retrieving players")
            }
        })
    }
    // adding a Player without score 
    static create(username){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let score = 0
                let playerData = await db.collection('players').insertOne({ username, score } )
                let id = playerData.insertedId
                let newPlayer = new Player({id, username, score})
                resolve (newPlayer);
            } catch (err) {
                reject ('Error creating player');
            }

        })
    }
    // find a player 
    static findByUsername(username) {
        return new Promise (async (resolve, reject ) => {
            try {
                const db = await init();
                let player = await db.collection('players').findOne({username: username})
                let newPlayer = new Player({...player })
                resolve (newPlayer);  
            }
            catch (err) {
                reject ( 'Player not found')
            }
        })
    }

    static update(username, score) {
        return new Promise (async (resolve, reject ) => {
           try {
                const db = await init();
                let player = await db.collection('players').findOneAndUpdate({username : username} ,{$inc: {score: score }}, {returnOriginal:false})
                let updatedPlayer = new Player({...player})
                resolve (updatedPlayer);
           }
           catch (err) {
               reject(err);
           }
        })
    }     

}

 
