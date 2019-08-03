const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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


// Virtual Propertie - Relation to Tasks Model and the owner Field -> Creates a Virtual Array with Tasks related to specific User
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField:"owner"
})

// Instance Method -> Converts first to an JSON Object, to delete the Object properties that we don't want to send a client response.
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Instance Method -> Generates a Token using JWT, to authenticate users
userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({_id: user._id}, "yellowbigcat")

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


// Mongoose Statics Method -> When Logging In User to compare Email and Password
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Unable to login")
    }

    return user
}

// Mongoose Middleware -> Using bcrypjs to hash password BEFORE saving User
userSchema.pre("save", async function (next) {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})



const User = mongoose.model("User", userSchema)


module.exports = User