const toNumber = () => {
	return (req, _, next) => {
		req.body.stockTotal = parseInt(req.body.stockTotal)
		req.body.pricePerDay = parseInt(req.body.pricePerDay)
		next()
	}
}

export default toNumber