const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const SignSchema = new Schema ({
    username:{
        type: String,
        required: [true, "Please enter your username"]
    },

    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        lowercase: true

    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [5, "Please the password length must be above five"]
    },
    
})

SignSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})



const Logger = mongoose.model("Logger", SignSchema);

module.exports = Logger;