const express = require("express")
const mongoose = require("mongoose");
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
require('dotenv').config();
require("./conn")
// require("./routes/flushDB")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/v1",router)

const port = process.env.PORT || 8005


app.listen(port,()=>console.log("server's up and running"))