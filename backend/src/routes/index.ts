import express from 'express'
const router = express.Router()
import userRoute from './user'
import todosRoute from './todos'

router.use("/user",userRoute)
router.use("/todos",todosRoute)

export default router