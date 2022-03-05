import express, { json } from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import categoriesRouter from './routes/categoriesRouter.js'
import gamesRouter from "./routes/gamesRouter.js";

dotenv.config()

const app = express()

app.use(cors())
app.use(json())

app.use(categoriesRouter)
app.use(gamesRouter)

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on ${process.env.SERVER_PORT}`))