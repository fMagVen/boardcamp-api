import joi from 'joi'

const gamesSchema = joi.object({
	name: joi.string().required(),
	image: joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg|jpeg|jfif|gif))/i).required(),
	stockTotal: joi.number().required().min(1),
	categoryId: joi.number().required(),
	pricePerDay: joi.number().required().min(1)
})

export default gamesSchema