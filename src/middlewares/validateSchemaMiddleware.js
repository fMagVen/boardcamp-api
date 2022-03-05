const validateSchema = (schema) => {
	return (req, res, next) => {
		const validation = schema.validate(req.body)
		if(validation.error){
			if(validation.error.details[0].message.includes("is not allowed to be empty")){
				return res.status(400).send("one or more required sent fields are empty")
			}
			else{
				return res.status(400).send(validation.error.details[0].message)
			}
		}
		next()
	}
}

export default validateSchema