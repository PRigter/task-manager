// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient

// const connectionURL = "mongodb://127.0.0.1:27017"
// const dataBaseName = "task-manager"

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log("Unable to connect to database")
//     }

//     // console.log("Connected successfully")

//     const db = client.db(dataBaseName)

//     // db.collection("users").insertOne({
//     //     name: "Paulo",
//     //     age: 36
//     // }, (error, result) => {
//     //     if (error) {
//     //         return console.log("Unable to insert user")
//     //     }

//     //     console.log(result.ops)
//     // })


//     db.collection("users").deleteMany({
//         age: 36 
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

// })