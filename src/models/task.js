const mongoose = require("mongoose")
const validator = require("validator")


// const Task = new moongoseSchema
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (validator.isInt(value)) {
                throw new Error("Your description cannot be only a number")
            }
        }
    }, 
    completed: {
        type: Boolean,
        default: false
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }

}, {
    timestamps: true
})




const Task = mongoose.model("Task", taskSchema)

module.exports = Task
