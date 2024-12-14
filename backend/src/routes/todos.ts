import express,{Request,Response} from 'express'
const router = express.Router()
import {Authmiddleware} from '../middleware'
import {todoSchema} from '../zod'
import {PrismaClient} from '@prisma/client'

const Prisma =new PrismaClient()

router.post("/createTodo",Authmiddleware,async(req,res)=>{
// get todo from req.body and crete in db

const todobody = req.body
const parsed = todoSchema.safeParse(todobody)

if(!parsed.success){
  res.status(400).json({msg:"invalid todo credentials",errors:parsed.error.errors})
  return

}
  const createdTodo =  await Prisma.todo.create({
        data:{
            title:todobody.title,
            description:todobody.description,
            // done:todobody.done,
            user_id:todobody.user_id
        }
    })

    if(!createdTodo){
        res.status(400).json({msg:"unable to creat todo"})
        return
    }

    res.status(200).json({msg:"todo creted successfully"})


})

//------------------------------------------------------------------------


router.get("/getTodos",Authmiddleware,async (req,res)=>{
    // get all todos of user in db
    const user_id =parseInt(req.query.user_id)
    console.log("user_Id------"user_id)
    
   
    if (!user_id) {
     res.status(400).json({ msg: "user_id is required" });
     return
    }
    // const userId =parseInt(user_id)

    if (typeof user_id !== 'number') {
         res.status(400).json({ msg: "user_id must be a number" });
         return
    }

    // Convert to a number (if necessary) or leave as string
    // const userIdNumber = parseInt(user_id, 10);

    // if (isNaN(userIdNumber)) {
    //     return res.status(400).json({ msg: "Invalid user_id" });
    // }
    
   const allTodos = await Prisma.todo.findMany({
        where:{
            user_id:user_id
        }
    })

    if(!allTodos){
        res.status(401).json({msg:"post not found"})
        return
    }

    res.status(200).json({allTodos})

})

export default router