import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, password: hashedPassword, role })
        await newUser.save()
        res.status(201).json({ message: `user resgistered with username  : ${username}` })
    } catch (error) {
        res.status(500).json({ message: `user could not registerd `, error })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json(`user not found with this user name ${username}`)
        }

       const isMatch = await bcrypt.compare(password , user.password)

        if (!isMatch) {
            return res.status(400).json("Invalid Credintials !")
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.SECRET_KEY,
            {expiresIn : "1h"}
        )
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({ message: `user could not login `, error })

    }
}

export const userProfile = async (req , res) =>{
    try {
        
    } catch (error) {
        
    }
}
