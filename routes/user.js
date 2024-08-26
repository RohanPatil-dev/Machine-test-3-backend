const express = require("express");
const router = express.Router()

const {upload} = require("../Multer/users")

const {authorization} = require("../Middleware/auth")

const {register,login,profileImg} = require("../controller/user")

router.post('/register',upload.single("userImage"),register)

router.post('/login',login)

router.get('/userImg',authorization,profileImg)

module.exports = router