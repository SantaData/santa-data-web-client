const router = require('express').Router();

//Controllers
const user = require('./user.js')

router.get("/", user.isLoggedIn);

//Login
router.post("/login",user.login);



module.exports = router