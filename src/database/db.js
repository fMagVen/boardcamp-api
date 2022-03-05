import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const connection = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME
})

export default connection