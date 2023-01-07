import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import log4js from 'log4js'



import authRoute from './Routes/auth.js'
import categoryRoute from './Routes/Admin/category.js'
import productRoute from './Routes/Admin/products.js'
import userRoute from './Routes/user.js'

import cookieParser from 'cookie-parser'

const app = express();
dotenv.config();

//logger confiq
const logger = log4js.getLogger("ECommerce");
logger.level = process.env.LOG_LEVEL || 'info'

app.use(log4js.connectLogger(logger, { level: logger.level }));


//db connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.Mongo_Connect);
        console.log('db Connected ')
    } catch (error) {
        throw error
    }
}



//middlewares
app.use(express.json())
app.use(cookieParser())



//routes
app.use('/api/auth', authRoute)
app.use('/api/admin', categoryRoute)
app.use('/api/admin', productRoute)
app.use('/api/user', userRoute)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        statusCode: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8080, () => {
    connect();
    console.log("Connected to backend.")
})