const router = require('express').Router();

//Controllers
const user = require('./user.js')

router.get("/", user.isLoggedIn);

//Login
router.use("/user",userRouter);

//Home




module.exports = router