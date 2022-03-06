import { Router } from "express";

import { getAllCustomers, getCustomerById, postCustomer, updateCustomer } from "../controllers/customersController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import customerSchema from "../schemas/customerSchema.js";

const customersRouter = Router()

customersRouter.get('/customers', getAllCustomers)
customersRouter.get('/customers/:id', getCustomerById)
customersRouter.post('/customers', validateSchema(customerSchema), postCustomer)
customersRouter.put('/customers/:id', validateSchema(customerSchema), updateCustomer)

export default customersRouter