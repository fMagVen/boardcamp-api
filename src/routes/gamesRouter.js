import { Router } from "express";
import { getGames, postGame } from '../controllers/gamesController.js'
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import toNumber from '../middlewares/toNumberMiddleware.js'
import gamesSchema from '../schemas/gamesSchema.js'

const gamesRouter = Router()

gamesRouter.get('/games', getGames)
gamesRouter.post('/games', toNumber(), validateSchema(gamesSchema), postGame)

export default gamesRouter