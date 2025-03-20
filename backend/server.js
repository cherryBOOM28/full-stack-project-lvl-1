import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRouters from './routes/product.route.js'

import path from 'path'


dotenv.config()

const app = express()
const port = process.env.PORT || 5002

const __dirname = path.resolve()

app.use(express.json()) // allows us to accept JSON datain the req.body
// console.log(process.env.MONGO_URI);

app.use("/api/products", productRouters)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(5002, () => {
    connectDb()
    console.log("Server started at http://localhost:" + port);
})
