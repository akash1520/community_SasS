const express = require("express")
const User = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const router = express.Router()


router
    .post("/signup", async (req, res) => {
        const { name, email, password } = req.body
        const user = new User({
            name, email, password
        })
        try {
            const result = await user.save()
            res.json(result)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

    .post("/signin", async (req, res) => {

        const [user] = await User.find({ email: req.body.email })
        const data = user.toObject();
        try {
            const token = user.generateToken(data)
            res.cookie("ComSaaS", token).json()
        }
        catch (error) {
            res.status(400).json({ Error: error.message })
        }

    })

    .get("/me",async(req,res)=>{
        try{
            const token = req.cookies.ComSaaS
        const userData=jwt.verify(token,process.env.key)
        delete userData.password
        res.json(userData)
    }
        // console.log(token)
        catch(error){
            res.json({Error:error.message})
        }
        
    })


module.exports = router;