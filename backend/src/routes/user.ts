import express,{Request,Response} from 'express'
const router = express.Router()
import {userSchema} from '../zod'
import {PrismaClient} from '@prisma/client'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {Authmiddleware} from "../middleware"

dotenv.config()
const prisma = new PrismaClient()
export const JWT_Secret = process.env.SECRET_KEY 

router.post("/signup",async (req:Request,res:Response)=>{
// get user credentials from req.body and generate token and create in db
// in body {email,firstName,lastName,password}

const userdata = req.body
const parserd = userSchema.safeParse(userdata)
if(!parserd.success){
     res.status(400).json({msg:"invalid inputs",errors: parserd.error.errors})
     return
}

const isExist = await prisma.user.findUnique({
    where:{
        email:userdata.email
    }
})

if(isExist){
   res.status(400).json({msg:"user Already Exist"})
   return
}

const cretedUser = await prisma.user.create({
    data:{
        email:userdata.email,
        firstName:userdata.firstName,
        lastName:userdata.lastName,
        password:userdata.password
    }
})

if(cretedUser){
    if (!JWT_Secret) {
        throw new Error("SECRET_KEY environment variable is missing.");
     }

   const bearertoken = jwt.sign({email:cretedUser.email,name:cretedUser.firstName},JWT_Secret)
   res.status(200).json({
    msg:"user Created Successfully",
    token:bearertoken,
    user:cretedUser
   })
    
}

})

router.get("/getUser",Authmiddleware,async (req:Request,res:Response)=>{
    // get user with id of user in db

   const user = await prisma.user.findUnique({
        where:{
            email:req.email
        }
    })

    if(!user){
       res.status(401).json({msg:"user not found"})
    }

    res.status(200).json({user})

})

export default router;


