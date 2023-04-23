const { default: mongoose } = require("mongoose");
const {Snowflake} = require("@theinternetfolks/snowflake");
const User = require("./userSchema");
const Role = require("./roleSchema");
const Community = require("./communitySchema");

const memberSchema = mongoose.Schema({
    id:{
        type:String,
        required:true,
        default:Snowflake.generate
    },
    community:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Community',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

const Member = mongoose.model("Member",memberSchema)
module.exports = Member