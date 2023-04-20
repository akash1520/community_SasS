const { default: mongoose } = require("mongoose");
const {Snowflake} = require("@theinternetfolks/snowflake");
const Validator = require("validatorjs");


const communitySchema = new mongoose.Schema({
    id: {
        type:String,
        default: Snowflake.generate
    },
    name:{
        type:String
    },
    slug:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    created_at: {
        type:Date,
        default: Date.now
    },
    updated_at: {
        type:Date,
        default: Date.now
    }
})


const rules = {
    id:'string',
    name: 'required|string|max:64',
    created_at: 'required|date',
    updated_at: 'required|date'
}

communitySchema.pre("save", function (next) {
    const data = this.toObject()
    const validation = new Validator(data, rules);

    if (validation.fails()) {
        const errors = validation.errors.all()
        return next(new Error(Object.values(errors).join(", ")))
    }
    return next()
})

// Pre-save middleware function to generate the slug field based on the name field
communitySchema.pre('save', function (next) {
    if (this.isNew || this.isModified('name')) {
        this.slug = generateSlug(this.name,this.id);
    }
    next();
});

// Function to generate the slug from the name field
function generateSlug(name,id) {
    return `community@${name}${id}`
}

const Community = mongoose.model("Community",communitySchema)
module.exports = Community