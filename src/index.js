const path = require("path")
const cors = require("cors")
const express = require("express")
const Task = require("./models/task") // chamada do modelo --> Task
const User = require("./models/user") // chamada do modelo --> User
const auth = require("./middleware/auth") // chamada do middleware --> auth
const upload = require("./middleware/upload") // chamada do middleware --> upload using multer
const sharp = require("sharp")

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

// --> Creating a User / SIGN UP
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



// --> User Logout
app.post("/users/logout", auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((obj) => {
            return obj.token !== req.token
        })

        await req.user.save()
        res.send({"message": "Logged Out"})

    } catch(e) {
        res.status(500).send()
    }

})


// --> User Logout ALL
app.post("/users/logoutAll", auth, async (req, res) => {

    try {
        req.user.tokens = []

        await req.user.save()
        res.send({"message": "Logout successfully from all sessions"})

    } catch(e) {
        res.status(500).send()
    }

})



// --> Authenticated User Profile
app.get("/users/me", auth, async (req, res) => {
    res.send(req.user)

})



// --> Updates a User
app.patch("/users/me", auth, async (req, res) => {
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
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()
        res.send(req.user)

    } catch(e) {
        res.status(400).send(e)
    }
})


app.delete("/users/me", auth, async (req, res) => {
    try {
        
        await req.user.remove()
        res.send(req.user)

    } catch(e) {
        res.status(500).send()
    }
})

///////////////////////////////////////////////////////////////////////

// Tasks Endpoints
// --> Creating a Task
app.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    console.log(task)    
    
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})


// --> Get All Tasks
app.get("/tasks", auth, async (req, res)=> {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === "true"
    }

    // Sorting using Req Query --> ?sortBy=dinamicValue:order
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }

    try {
        await req.user.populate({
            path: "tasks", 
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
  
        res.send(req.user.tasks)

    } catch(e) {
        res.status(500).send()
    }
})


// --> Find a task, by id
app.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id

    try {
        
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        
        res.send(task)

    } catch(e) {
        res.status(500).send(e)
    }

})


// --> Updates a task, by id
app.patch("/tasks/:id", auth, async (req, res) => {
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
        const task = await Task.findOne({ _id, owner: req.user._id })

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
app.delete("/tasks/:id", auth, async (req, res) => {

    try {
        const _id = req.params.id
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch(e) {
        res.status(500).send(e)
    }

})



// --> Route to Create/Upload User Avatar
app.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
     
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// --> Route to Delete User Avatar
app.delete("/users/me/avatar", auth, async (req, res) => {
    
    try {

        if (!req.user.avatar) {
            throw new Error()
        }
    
        req.user.avatar = undefined
        await req.user.save()
        res.send({ "Message": "Your Avatar has been deleted" })

    } catch(e) {
        res.status(404).send({ "Message": "No Avatar found to Delete" })
    }


})


// --> Route to get a User's Avatar
app.get("/users/id/avatar", async (req, res) => {

    try {
        const id = req.params.id
        const user = await User.findById(id)

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set("Content-Type","image/jpg")
        res.send(user.avatar)


    } catch(e) {
        res.status(404).send()
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