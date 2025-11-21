import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './modules/auth/auth.routes'
import userRoutes from './modules/user/user.route'
import reviewerRoutes from './modules/reviewer/reviewer.route'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.get('/health',(req,res)=>{
    res.json({status:'OK',message:'Server Running'})
})

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/reviewer',reviewerRoutes)

export default app
