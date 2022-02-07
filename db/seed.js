const db = connect("mongodb://localhost:27017/playersdb")

db.players.drop()
db.players.insertMany([

    
    { username: "Player1", score: 50},
    { username: "Player2", score: 50},
    { username: "Player3", score: 50},
    { username: "Player4", score: 50},
    { username: "Test1", score: 100}

])

