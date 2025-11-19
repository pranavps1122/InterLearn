import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import {connectDB} from './config/db'


const PORT = process.env.PORT||5000

async function start() {

    try { 
        await connectDB()
        app.listen(PORT,()=>{
            console.log(`server is running on PORT ${PORT}`)
        })
    } catch (error) {
        console.log('Server not running',error)
    }
    
}
start()