const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error("Name cannot be empty")
            }

            if(!validator.isLength(value, { min: 1, max: 20})) {
                throw new Error("Name must be greater than 1 character and maximum 20")
            }
        }

    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isLength(value, { min: 5, max: undefined })) {
                throw new Error("Password must have more than 4 characters")
            }

            if (value.toLowerCase().includes("password")) {
                throw new Error("Please choose a different password")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0 ) {
                throw new Error("Age must be a positive number")
            }
        }
    }, 
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
})


const User = mongoose.model("User", userSchema)


module.exports = User