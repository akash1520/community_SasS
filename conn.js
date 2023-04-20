const mongoose = require("mongoose")

mongoose.connect(process.env.DB)
        .then(()=>console.log("connected to database"))
        .catch((error)=>console.log(error))