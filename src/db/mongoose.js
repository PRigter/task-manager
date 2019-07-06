const mongoose = require("mongoose")


// Establecer ligação à base de dados
mongoose.connect("mongodb://127.0.0.1/task-manager", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

