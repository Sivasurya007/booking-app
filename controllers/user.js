import User from "../models/user.js"

export const updateuser =async(req,res,next)=>{

    try{
        const updateduser = await hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updateduser)

    }catch(err){
        next(err)
}

}
export const deleteuser =async(req,res,next)=>{

    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")

    }catch(err){
        next(err)
}

}
export const getuser=async(req,res,next)=>{
   

    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user)

    }catch(err){
        next(err)
}}
export const getalluser =async(req,res,next)=>{
   

    try{
        const users=await User.find()
        res.status(200).json(users)

    }catch(err){
        next(err)
}

}
