import connection from "../database/db.js"


const getCategories = async (req, res) => {
	try{
		const categories = await connection.query('SELECT * FROM categories')
		res.status(200).send(categories.rows)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

const postCategory = async (req, res) => {
	try{
		const category = await connection.query('SELECT * FROM categories WHERE name=$1', [req.body.name])
		if(category.rowCount > 0){
			return res.status(409).send('Category already exists!')
		}
		await connection.query('INSERT INTO categories (name) VALUES ($1)', [req.body.name])
		res.sendStatus(201)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

export {
	getCategories,
	postCategory,
}