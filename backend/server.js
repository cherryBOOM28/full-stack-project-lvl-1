import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRouters from './routes/product.route.js'


dotenv.config()

const app = express()

app.use(express.json()) // allows us to accept JSON datain the req.body
// console.log(process.env.MONGO_URI);

app.use("/api/products", productRouters)

app.listen(5002, () => {
    connectDb()
    console.log("Server started at http://localhost:5002");
})
