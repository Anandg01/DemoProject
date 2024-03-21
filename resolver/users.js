
const Users = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const queries = {
    users: async () => await Users.findAll(),
   
    userLogin: async (parent, args) => {
        console.log(args);
        const { email, password } = args;
        const user = await Users.findOne({ where: { email } })
        if (!user) return("Email not found plese signup")

        const hashPassword = user.password;
        const isMatch = await bcrypt.compare(password, hashPassword)
        if (!isMatch) return("Incorrect Password")
        
        //gen token

        const token=jwt.sign({id:user.id,email:user.email},"8uu**jhjhjfds")
        
        return token
    },

    getCurretnLoggedInUser:async(parent, args, context)=>{
        console.log(context)
       return context;
    }
}

const mutation = {
    createUser: async (parent, args) => {
        console.log(args)
        const exitEmail = await Users.findOne({ where: { email: args.email } })
        if (exitEmail) {
            return("email already present in database")
        }
        const hash = await bcrypt.hash(args.password, 10)

        await Users.create({ ...args, password: hash });

        return ("user create successfull")
    }
}
module.exports = { queries, mutation }