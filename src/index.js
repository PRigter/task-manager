const path = require("path")
const express = require("express")
const Task = require("./models/task")// chamada do modelo --> Task

// chamada do mongoose - na pasta "DB"
require("./db/mongoose")

const app = express()

// Definição da port
const port = process.env.PORT || 3000

// Parse da info que nos chega formato JSON
app.use(express.json())


//////////////////////////////////////////////////////////
// Routes 

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