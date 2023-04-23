const { default: mongoose } = require("mongoose");
const express = require("express");
const Member = require("../models/memberSchema");
const jwt = require("jsonwebtoken");
const Community = require("../models/communitySchema");
const router = express.Router()

router
    .post("/member", async function (req, res) {
        const { community, user, role } = req.body
        const member = new Member({
            community, user, role
        })
        const result = await member.save()
        res.json(result)
    })
    .delete("/member/:id", async function (req, res) {
        try {
            const mem_id = req.params.id
            const token = req.cookies.ComSasS
            const { _id } = jwt.decode(token, process.env.key)
            const member = await Member.findById(mem_id)
            const community_admin = (await Community.findById(member.community)).owner
            console.log(_id, community_admin);
            if (_id === community_admin) {
                const result = await Member.deleteOne({ _id: mem_id })
                res.status(200).json(result)
            }res.json({Error:"You don't have admin access."})
        }
        catch (error) {
            res.json({ Error: error.message })
        }
    })
module.exports = router