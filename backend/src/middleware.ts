import {Request,Response} from 'express'
import  Jwt  from 'jsonwebtoken'
import {JWT_Secret} from './routes/user'

export const Authmiddleware = (req:Request,res:Response,next:any)=>{

   const bearertoken = req.headers.authorization

   if(!bearertoken){
     res.status(401).json({msg:"token not found"})
     return
   }
   const token = bearertoken?.split(" ")[1]
   if(JWT_Secret){
      const decode = Jwt.verify(token,JWT_Secret) as { email: string };   // Type assertion to indicate the expected structure
      req.email = decode.email  // now we can assign values
      next()
   }else{
    res.status(401).json({msg:"JWT_Secret not found"})
   }

}

