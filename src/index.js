const path = require("path")
const express = require("express")
const Task = require("./models/task")// chamada do modelo --> Task

// chamada do mongoose - na pasta "DB"
require("./db/mongoose")

const app = express()

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

app.get("/", async (req, res) => {
    res.send("index")
})




// Route para criação de uma nova tarefa
app.post("/tasks", async (req, res) => {
    res.render("List with Tasks")

    const task = new Task({
        ...req.body
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }


})





app.listen(port, () => {
    console.log("Server is up on port " + port)
})