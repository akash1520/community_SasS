const express = require("express")
const router = express.Router()
const userRouter = require("./userRouter")
const roleRouter = require("./roleRouter")
const communityRouter = require("./communityRouter")

router.use("/auth",userRouter);
router.use(roleRouter);
router.use(communityRouter);


module.exports = router;