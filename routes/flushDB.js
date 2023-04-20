const Role = require("../models/roleSchema");
const User = require("../models/userSchema");

async function flush(){const res=await User.deleteMany({})
const res1=await Role.deleteMany({})
console.log(res,res1)}

flush()