const express = require("express")
const Community = require("../models/communitySchema")
const jwt = require("jsonwebtoken")
const Member = require("../models/memberSchema")
const router = express.Router()

async function communityGen(name, owner_id) {
  const comm = new Community({ name: name, owner: owner_id })
  const result = await comm.save()
  return result
}


router
  .post("/community", async (req, res) => {
    const { name } = req.body
    const token = req.cookies.ComSaaS
    const owner_id = jwt.decode(token, process.env.key)._id
    let result = await communityGen(name, owner_id)
    result = result.toObject()
    delete result._id
    delete result.__v
    res.json(result)
  })

  .get("/community", async (req, res) => {
    try {
      const comms = await Community.find({}).populate('owner', '-password -_id -__v');
      const arr = comms.map((community) => {
        const comm = community.toObject();
        delete comm._id;
        delete comm.__v;
        return comm;
      });
      res.json(arr);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .get("/community/:id/members",async(req,res)=>{
      const community_name = req.params.id
      const community = (await Community.find({name:community_name}))[0]
      console.log(community);
      const members = await Member.find({community:community._id})
      console.log(members);
      res.json(members)
  })
  .get("/community/me/owner",async(req,res)=>{
    const token = req.cookies.ComSaaS
    const data = jwt.decode(token,process.env.key)
    const comm_owner_id = data._id
    const comms = await Community.find({owner:comm_owner_id})
    res.json(comms)
  })

// .get("/community", async (req, res) => {
//     const comms = await Community.find({})
//     const arr=[]
//     comms.forEach(element => {
//         element
//             .populate('owner')
//             .then(community => {
//                 const comm = community.toObject()
//                 delete comm.owner.password
//                 delete comm.owner._id
//                 delete comm.owner.__v
//                 console.log(comm);
//                 // arr.concat(comm)
//             })
//             .catch(err => {
//                 console.error(err);
//             });
//     });
//     res.json(arr)
// })


module.exports = router;