const path = require("path")
const cors = require("cors")
const express = require("express")
const Task = require("./models/task")// chamada do modelo --> Task
const User = require("./models/user") // chamada do modelo --> User


// chamada do mongoose - na pasta "DB"
require("./db/mongoose")

const app = express()

// CORS enables all connections to the servers
// altought some config might be needed for productions
app.use(cors())

// Definição da port
const port = process.env.PORT

// Definição dos path's for Express config
const publicDirectoryPath = path.join(__dirname, "../public")


// Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))

// Parse da info que chega ao Servidor em formato JSON -> convertendo a mesma em um Objecto
// Passamos a conseguir obter a info deste objecto, usando o req.body
app.use(express.json())


//////////////////////////////////////////////////////////
// Routes 
// Creation Endpoints

app.get("/", (req, res) => {
    res.render("index") // ----------------> Needs ENGINE correction
})

// --> Creating a User
app.post("/users", (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    console.log(user)
    
    user.save().then(() => {
        console.log('saved', user)
        res.send(user)
    }).catch((error) => {
        console.log('error', error)
        res.status(400).send(error)
    })
})

// --> Find a User, by id
app.get("/users/:id", (req, res) => {

})

// --> Updates a User by id
app.patch("users/:id", (req,res) => {

})


app.delete("users/:id", (req, res) => {

})



// Tasks Endpoints
// --> Creating a Task
app.post("/tasks", (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})


// --> Find a task, by id
app.get("/tasks/:id", (req, res) => {

})


// --> Updates a task, by id
app.patch("/task/:id", (req, res) => {

})


// --> Deletes a task, by id
app.delete("/tasks/:id", (req, res) => {

})






///////////////////////////////////////////////////////////

// app.get("/", async (req, res) => {
//     res.send("index")
// })




// // Route para criação de uma nova tarefa
// app.post("/tasks", async (req, res) => {
//     res.render("List with Tasks")

//     const task = new Task({
//         ...req.body
//     })

//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }


// })





app.listen(port, () => {
    console.log("Server is up on port " + port)
})