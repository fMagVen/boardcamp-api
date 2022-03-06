import connection from "../database/db.js";

const getAllCustomers = async (req, res) => {
	try{
		const cpf = req.query.cpf
		if(cpf){
			const customers = await connection.query('SELECT * FROM customers WHERE cpf LIKE $1%', [cpf])
			res.status(200).send(customers.rows)
		}
		else{
			const customers = await connection.query('SELECT * FROM customers')
			res.status(200).send(customers.rows)
		}
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

const getCustomerById = async (req, res) => {
	try{
		const customer = await connection.query('SELECT * FROM customers WHERE id=$1', [req.params.id])
		if(customer.rowCount == 0){
			return res.status(404).send('Customer not found!')
		}
		res.status(200).send(customer.rows)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

const postCustomer = async (req, res) => {
	try{
		const customer = await connection.query('SELECT * FROM customers WHERE cpf=$1', [req.body.cpf])
		if(customer.rowCount > 0){
			return res.status(409).send('Customer already exists!')
		}
		await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [req.body.name, req.body.phone, req.body.cpf, req.body.birthday])
		res.sendStatus(201)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

const updateCustomer = async (req, res) => {
	try{
		const customer = await connection.query('SELECT * FROM customers WHERE cpf=$1', [req.body.cpf])
		if(customer.rowCount > 0){
			return res.status(409).send('Customer already exists!')
		}
		await connection.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5', [req.body.name, req.body.phone, req.body.cpf, req.body.birthday, req.params.id])
		res.sendStatus(200)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}

export {
	getAllCustomers,
	getCustomerById,
	postCustomer,
	updateCustomer
}