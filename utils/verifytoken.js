import jwt from "jsonwebtoken";
import { createerror } from "../utils/error.js";

export const verifytoken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createerror(401,"you are not authenticated"))
    }

    jwt.verify(token,process.env.JWT,(err, user)=>{
        if(err) return next(createerror(403,"token is not valid"))
        req.user=user;
        next()
    })
}