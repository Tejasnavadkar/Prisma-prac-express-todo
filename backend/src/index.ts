import express from 'express'
import RootRouter from './routes/index'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1",RootRouter)



try {app.listen(3000,()=>{
 
    console.log("server Started")
})
}catch(err){
    console.log("err while starting server",err)
}