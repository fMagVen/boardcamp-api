import { Router } from "express";
import { getRentals, postRental, returnRental, deleteRental } from "../controllers/rentalsController.js";

import validateSchema from '../middlewares/validateSchemaMiddleware.js'
import rentalSchema from "../schemas/rentalSchema.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', validateSchema(rentalSchema), postRental)
rentalsRouter.post('/rentals/:id/return', returnRental)
rentalsRouter.delete('/rentals/:id', deleteRental)

export default rentalsRouter