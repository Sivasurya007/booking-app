import User from "../models/user.js"
import bcrypt from "bcrypt"
import { createerror } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async(req,res,next)=>{

    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newuser = new User({
         username:req.body.username,
         email:req.body.email,
         password:hash
        })

        await newuser.save()
        res.status(200).send("user has been created")
    }catch(err){
        next(err)
    }
}
export const login = async(req,res,next)=>{

    try{
     const user = await User.findOne({username:req.body.username})
     if(!user) return next(createerror(404,"user not found"))

     const ispasswordcorrect = await bcrypt.compare(req.body.password, user.password)
     if(!ispasswordcorrect) return next(createerror(400,"wrong password or username"))

     const token = jwt.sign({id: user.id,isadmin: user.isadmin}, process.env.JWT)
     const {password, isadmin, ...otherdetails}=user._doc
     res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherdetails})
    }catch(err){
        next(err)
    }
}