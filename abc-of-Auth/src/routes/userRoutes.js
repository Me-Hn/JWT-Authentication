import express from "express"
import verifyToken from "../middlewares/authMiddleware.js"
import authorizeRoles from "../middlewares/roleMiddleware.js"

const router = express.Router()


router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
    res.json("wellcom admin")
})

router.get("/manager",verifyToken,authorizeRoles("admin","manager"),(req,res)=>{
    res.json("wellcom manager")
})

router.get("/user",verifyToken,authorizeRoles("admin","manager","user"),(req,res)=>{
    res.json("wellcom user")
})

export default router;