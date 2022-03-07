import joiBase from 'joi'
import joiDate from '@hapi/joi-date'

const joi = joiBase.extend(joiDate)

const customerSchema = joi.object({
	name: joi.string().required(),
	phone: joi.string().pattern(/^[0-9]{10,11}$/).required(),
	cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
	birthday: joi.date().format('YYYY-MM-DD').required()
})

export default customerSchema