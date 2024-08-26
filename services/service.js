const jwt = require("jsonwebtoken")

const secret = "Rohan123504"

function setUser(user) {
   const payload = {
       _id : user.id,
       username : user.username,
       email : user.email,
       password : user.password,
       userImage : user.userImage
   }

   return jwt.sign(payload,secret)
}


module.exports = {setUser}
