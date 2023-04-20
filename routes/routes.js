const express = require("express")
const router = express.Router()
const userRouter = require("./userRouter")
const roleRouter = require("./roleRouter")
router.use("/auth",userRouter);
router.use(roleRouter);


module.exports = router;