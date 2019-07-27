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

// --> User Login
app.post("/users/login", async (req, res) => {
    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()       

        res.send({ user, token })

    } catch(e) {
        res.status(400).send(e)
    }
})


// --> Creating a User
app.post("/users", async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })

    } catch(e) {
        res.status(400).send(e)
    }
    
})

// --> Find a User, by id
app.get("/users/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch(e) {
        res.status(500).send(e)
    }
})

// --> Updates a User by id
app.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    // To verify if the commited changes are allowed properties to change on User
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(404).send({"error": "Invalid Updates"})
    }

    try {
        const _id = req.params.id
        const user = await User.findById(_id)

        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        if (!user) {
            res.status(404).send()
        }

        res.send(user)

    } catch(e) {
        res.status(500).send(e)
    }
})


app.delete("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch(e) {
        res.status(500).send()
    }
})



// Tasks Endpoints
// --> Creating a Task
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})


// --> Find a task, by id
app.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }
        
        res.send(task)

    } catch(e) {
        res.status(500).send(e)
    }

})


// --> Updates a task, by id
app.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ "error": "Invalid Updates!" })
    }
    
    
    try {
        const _id = req.params.id
        const task = await Task.findById(_id)

        updates.forEach((update) => {
            task[update] = req.body[update]    
        })

        await task.save() 

        if (!task) {
            res.status(404).send()
        }

        res.send(task)

    } catch(e) {
        res.status(400).send(e)
    }
})


// --> Deletes a task, by id
app.delete("/tasks/:id", async (req, res) => {

    try {
        const _id = req.params.id
        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch(e) {
        res.status(500).send(e)
    }

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