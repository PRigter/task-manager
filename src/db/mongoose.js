const mongoose = require("mongoose")

const url = process.env.MONGODB_URL

// Establecer ligação à base de dados
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false

}, (error, client) => {
    if (error) {
       return console.log("Unable to connect to DB", error)
    }

    console.log("Connection is a Success!")
})


// const User = mongoose.model("User", {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })


// const me = new User({
//     name: "Pedro",
//     age: 36
// })


// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log("Error", error)
// })