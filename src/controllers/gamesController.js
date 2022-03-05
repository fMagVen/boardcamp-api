import connection from "../database/db.js"

const getGames = async (req, res) => {
	try{
		const games = await connection.query('SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id')
		res.status(200).send(games.rows)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

const postGame = async (req, res) => {
	try{
		const game = await connection.query('SELECT * FROM games WHERE name=$1', [req.body.name])
		if(game.rowCount > 0){
			return res.status(409).send('This game is already registered')
		}
		const category = await connection.query('SELECT * FROM categories WHERE id=$1', [req.body.categoryId])
		if(category.rowCount == 0){
			return res.status(400).send('This category id is invalid')
		}
		await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [req.body.name, req.body.image, req.body.stockTotal, req.body.categoryId, req.body.pricePerDay])
		res.sendStatus(201)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

export {
	getGames,
	postGame
}