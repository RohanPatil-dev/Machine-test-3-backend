const { setUser } = require("../services/service")

const user = require("../model/user")

const jwt = require("jsonwebtoken")

const secret = "Rohan123504"

async function register(req, res) {

    try {
        const { username, email, password, role } = req.body

        const userImage = req.file

        console.log(userImage);
        

        if (!username && !email && !password && !role) {
            return res.status(400).json({ msg: "Form is empty !" })
        } else if (!username) {
            return res.status(400).json({ msg: "Username is not defined !" })
        } else if (!email) {
            return res.status(400).json({ msg: "Email is not defined !" })
        }
        else if (!password) {
            return res.status(400).json({ msg: "Password is not defined !" })
        }
        else if (password.length > 8) {
            return res.status(400).json({ msg: "password is over the 8 characters !" })
        }
        else if (password.length < 8) {
            return res.status(400).json({ msg: "password is under the 8 characters !" })
        } 
        else if (!role) {
            return res.status(400).json({ msg: "Please select role !" })
        }
        else {
            console.log(req.body);
            const registerData = new user({ username: username, email: email, password: password, role: role,userImage : userImage.filename })

            await registerData.save()

            return res.status(201).json({ msg: "Data registered successfully !", data: registerData })
        }
    } catch (error) {
        return res.status(400).json({ msg: "server error", error: error })
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body

        const findEmail = await user.findOne({ email: email, password: password })

        console.log(findEmail.role);

        if (!email && !password) {
            return res.status(400).json({ msg: "Form is empty !" })
        } else if (!email) {
            return res.status(400).json({ msg: "Email is not defined !" })
        } else if (!password) {
            return res.status(400).json({ msg: "Password is not defined !" })
        }
        else if (password.length > 8) {
            return res.status(400).json({ msg: "password is over the 8 characters !" })
        }
        else if (password.length < 8) {
            return res.status(400).json({ msg: "password is under the 8 characters !" })
        }
        else if (!findEmail) {
            return res.status(400).json({ msg: "Invalid email and password !" })
        } else {
            const token = setUser(findEmail)
            console.log("token", token);

            return res.status(201).json({ msg: `Your email is : ${email} and Password is ${password}`, role: findEmail.role, token })
        }
    } catch (error) {
        return res.status(400).json({ msg: "error found", error })
    }
}


function profileImg(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err;

            return res.status(201).json({ profileImg: data.userImage,username : data.username })
        })
    } catch (error) {
        return res.status(400).json({ msg: "Invalid profile" })
    }
}


module.exports = { register, login, profileImg }