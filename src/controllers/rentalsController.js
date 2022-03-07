import connection from "../database/db.js";
import dayjs from "dayjs";

const getRentals = async (req, res) => {
	try{
		if(req.query.customerId){
			const rentals = await connection.query(`
			SELECT rentals.*, customers.name as "customername", games.name as "gamename", games."categoryId", categories.name as "categoryName" 
			FROM rentals
			JOIN customers ON rentals."customerId"=$1
			JOIN games ON rentals."gameId"=games.id
			JOIN categories ON games."categoryId"=categories.id`, [req.query.customerId])
			for(let i = 0; i < rentals.rows.length; i++){
				rentals.rows[i].rentDate = dayjs(rentals.rows[i].rentDate).format('YYYY-MM-DD')
				if(rentals.rows[i].returnDate != null){
					rentals.rows[i].returnDate = dayjs(rentals.rows[i].returnDate).format('YYYY-MM-DD')
				}
				rentals.rows[i].customer = { id:rentals.rows[i].customerId, name: rentals.rows[i].customername }
				delete rentals.rows[i].customername
				rentals.rows[i].game = { id:rentals.rows[i].gameId, name: rentals.rows[i].gamename, categoryId: rentals.rows[i].categoryId, categoryName: rentals.rows[i].categoryName }
				delete rentals.rows[i].gamename
				delete rentals.rows[i].categoryId
				delete rentals.rows[i].categoryName
			}
			return res.status(200).send(rentals.rows)
		}
		if(req.query.gameId){
			const rentals = await connection.query(`
			SELECT rentals.*, customers.name as "customername", games.name as "gamename", games."categoryId", categories.name as "categoryName" 
			FROM rentals
			JOIN customers ON rentals."customerId"=customers.id
			JOIN games ON rentals."gameId"=$1
			JOIN categories ON games."categoryId"=categories.id`, [req.query.gameId])
			for(let i = 0; i < rentals.rows.length; i++){
				rentals.rows[i].rentDate = dayjs(rentals.rows[i].rentDate).format('YYYY-MM-DD')
				if(rentals.rows[i].returnDate != null){
					rentals.rows[i].returnDate = dayjs(rentals.rows[i].returnDate).format('YYYY-MM-DD')
				}
				rentals.rows[i].customer = { id:rentals.rows[i].customerId, name: rentals.rows[i].customername }
				delete rentals.rows[i].customername
				rentals.rows[i].game = { id:rentals.rows[i].gameId, name: rentals.rows[i].gamename, categoryId: rentals.rows[i].categoryId, categoryName: rentals.rows[i].categoryName }
				delete rentals.rows[i].gamename
				delete rentals.rows[i].categoryId
				delete rentals.rows[i].categoryName
			}
			return res.status(200).send(rentals.rows)
		}
		const rentals = await connection.query(`
			SELECT rentals.*, customers.name as "customername", games.name as "gamename", games."categoryId", categories.name as "categoryName" 
			FROM rentals
			JOIN customers ON rentals."customerId"=customers.id
			JOIN games ON rentals."gameId"=games.id
			JOIN categories ON games."categoryId"=categories.id
		`)
		for(let i = 0; i < rentals.rows.length; i++){
			rentals.rows[i].rentDate = dayjs(rentals.rows[i].rentDate).format('YYYY-MM-DD')
			if(rentals.rows[i].returnDate != null){
				rentals.rows[i].returnDate = dayjs(rentals.rows[i].returnDate).format('YYYY-MM-DD')
			}
			rentals.rows[i].customer = { id:rentals.rows[i].customerId, name: rentals.rows[i].customername }
			delete rentals.rows[i].customername
			rentals.rows[i].game = { id:rentals.rows[i].gameId, name: rentals.rows[i].gamename, categoryId: rentals.rows[i].categoryId, categoryName: rentals.rows[i].categoryName }
			delete rentals.rows[i].gamename
			delete rentals.rows[i].categoryId
			delete rentals.rows[i].categoryName
		}
		res.status(200).send(rentals.rows)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

const postRental = async (req, res) => {
	try{
		const customer = await connection.query('SELECT id FROM customers WHERE id=$1', [req.body.customerId])
		if(customer.rowCount == 0){
			return res.status(400).send('mistyped customerId or non existent')
		}
		const game = await connection.query('SELECT id, "pricePerDay" FROM games WHERE id=$1', [req.body.gameId])
		if(game.rowCount == 0){
			return res.status(400).send('mistyped gameId or non existent')
		}
		await connection.query(`
		INSERT INTO rentals
		("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		`, [req.body.customerId, req.body.gameId, dayjs().format('YYYY-MM-DD'), req.body.daysRented, null, game.rows[0].pricePerDay, null])
		res.sendStatus(201)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

const returnRental = async (req, res) => {
	try{
		const rental = await connection.query('SELECT * FROM rentals WHERE id=$1', [req.params.id])
		if(rental.rowCount == 0){
			return res.status(404).send('rental id not found!')
		}
		if(rental.rows[0].returnDate != null){
			return res.status(400).send('rental already finalized!')
		}
		rental.rows[0].returnDate = dayjs().format('YYYY-MM-DD')
		rental.rows[0].rentDate = dayjs(rental.rows[0].rentDate).format('YYYY-MM-DD')
		const dayone = new Date(rental.rows[0].rentDate)
		const daytwo = new Date(rental.rows[0].returnDate)
		const totalDays = (daytwo - dayone) / (1000 * 3600 * 24)
		const delayDays = totalDays - rental.rows[0].daysRented
		if(delayDays > 0){
			rental.rows[0].delayFee = delayDays * rental.rows[0].originalPrice
		}
		await connection.query(`
		UPDATE rentals
		SET
		"customerId"=$1, "gameId"=$2, "rentDate"=$3, "daysRented"=$4, "returnDate"=$5, "originalPrice"=$6, "delayFee"=$7
		WHERE id=$8
		`, [rental.rows[0].customerId, rental.rows[0].gameId, rental.rows[0].rentDate, rental.rows[0].daysRented, rental.rows[0].returnDate, rental.rows[0].originalPrice, rental.rows[0].delayFee, rental.rows[0].id])
		return res.sendStatus(200)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

const deleteRental = async (req, res) => {
	try{
		const rental = await connection.query('SELECT * FROM rentals WHERE id=$1', [req.params.id])
		if(rental.rowCount == 0){
			return res.status(404).send('rental id not found!')
		}
		if(rental.rows[0].returnDate != null){
			return res.status(400).send('rental already finalized!')
		}
		await connection.query('DELETE FROM rentals WHERE id=$1', [req.params.id])
		res.sendStatus(200)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

export{
	getRentals,
	postRental,
	returnRental,
	deleteRental
}