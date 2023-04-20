const express = require("express")
const Role = require("../models/roleSchema")
const jwt = require("jsonwebtoken")
const router = express.Router()



router
    .post("/role", async (req, res) => {
        try {
            const { name } = req.body

            const token = req.cookies.ComSaaS
            const owner_id = jwt.decode(token,process.env.key).id

            const role = new Role({ name })
            let rl = await role.save()
            rl=rl.toObject()
            delete rl.slug
            delete rl._id
            delete rl.__v
            delete rl.id

            res.json(rl)

        }
        catch (error) {
            res.json({ Error: error.message })
        }
    })

    .get("/role", async (req, res) => {
        const roles = await Role.find({})
        let rls=[]
        roles.forEach((rl)=>{
            rl=rl.toObject()
            delete rl.slug
            delete rl._id
            delete rl.__v
            delete rl.id
            rls.push(rl)
        })
        res.json(rls)
    })


module.exports = router;