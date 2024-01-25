import express from "express"
import {updateuser,deleteuser,getuser,getalluser} from "../controllers/user.js"
import { verifytoken } from "../utils/verifytoken.js"


const router = express.Router()

router.get("/checkauth",verifytoken,(req,res,next)=>{
    res.send("hello user, you are logged in");

})          
router.put("/:id",updateuser)
router.delete("/:id",deleteuser)
router.get("/:id",getuser)
router.get("/",getalluser)
    
export default router
