const { Snowflake } = require("@theinternetfolks/snowflake");
const mongoose = require("mongoose");
const Validator = require('validatorjs')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const salt = bcrypt.genSaltSync(14)

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: Snowflake.generate
    },
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateToken = function(data){
    const token = jwt.sign(data,process.env.key,{expiresIn:1800})
    return token
}

userSchema.pre("save", function (next) {
    const data = this.toObject()

    const rules = {
        id: 'required|string',
        name: 'required|string|max:64',
        email: 'required|email|max:128',
        password: [
            'required',
            'string',
            'min:8',
            'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/',
            'max:64'
        ],
        created_at: 'required|date'
    }

    const validation = new Validator(data, rules);

    if (validation.fails()) {
        const errors = validation.errors.all()
        return next(new Error(Object.values(errors).join(", ")))
    }
    return next()
})


userSchema.pre("save",async function(next){
    try{
    this.password = await bcrypt.hashSync(this.password,salt)
    next()
}
    catch(error){
        next(new Error(Object.values(errors).join(", ")))
    }
    
})



const User = mongoose.model('User', userSchema);

module.exports = User;