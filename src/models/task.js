const mongoose = require("mongoose")
const validator = require("validator")


const taskSchema = new moongoseSchema({
    description: {
        type: String,
        trim: true,
        required: true,
        validade(value) {
            if (validator.isInt(value)) {
                throw new Error("Your description cannot be only a number")
            }
        },
        completed: {
            type: Boolean,
            default: false
        }

    }

}, {
    timestamps: true
})


const Task = mongoose.model("Task", taskSchema)

module.exports = Task