#  Boardcamp API :game_die:
## Rent, Play, Enjoy!

### :computer: Tech used
<p>
	<img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
	<img alt="nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
	<img alt="expressjs" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
	<img alt="postgres" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
	<img alt="eslinter" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"/>
	
</p>

<br/>


## :mag: Overview 

API project for a tabletop game rental platform

## :hammer_and_wrench: Installation

Before you begin, make sure you have the following tools installed:
[Git](https://git-scm.com), [PostGreSQL](https://www.postgresql.org/) and
[Node.js](https://nodejs.org/en/).
<br>
Not required, but recommended:
[VSCode](https://code.visualstudio.com/)

```bash

# Clone this repository
$ gh repo clone fMagVen/boardcamp-api

# Access the folder you downloaded to from terminal/cmd
$ cd boardcamp-api

# Install dependencies
$ npm install

```

Create and populate a `.env` file with the following:

### Creating and populating the database

```bash

# Access postgres
sudo su postgres

# Entthe client
psql

# Create database
CREATE DATABASE boardcamp

# Connect
\c boardcamp

```

### :gear: Running
```bash

# Execute in dev mode
$ npm run start:dev

# or in prod mode
$ npm run build

```
The server will initialize in the chosen PORT from `.env` file, at http://localhost:PORT

<br/>


## 📜 Documentation

Endpoints:

### `GET /categories`
Get all categories of games
### `POST /categories`
Post a new category. Request must be of format: { name: 'category-name' }
### `GET /games`
Get all available games with info on game name, display picture, quantity available for renting, price and category.
### `POST /games`
Post a new game. Guidelines are:

{

	name: 'non empty string',
	stockTotal: Total amount of units available for rental. Accepts strings and numbers,
	categoryId: Id of game category. For a list of possible categories, refer to endpoint GET /categories,
	pricePerDay: Price of renting. String or number. Price in cents only, so multiply the actual value by 100. E.g.: $100.99 is to be posted as 10099 (no $).
}
### `GET /customers/:id`
Get all customers, optional parameter ```id``` allows you to get specific customer by id
### `POST /customers`
Post a new customer. Guidelines are:

{

	name: non empty string,
	phone: number or string with 10 or 11 numerical digits,
	cpf: number or string with 11 numerical digits,
	birthday: date in format YYYY-MM-DD

} 
### `PUT /customers/:id`
Update a customer registry data, by id, parameter required. Guidelines are same as above, but cpf can't be repeated, that is, can't be the same.

<br/>

<br/>


### :man_technologist: Author
<p>Made with care by</p>
<a href="https://github.com/fMagVen"><img  style="border-radius: 50%;"  src="https://avatars.githubusercontent.com/u/78576546?v=4"  width="100px;"  alt="Felipe Ventura"/></a>

[![Gmail Badge](https://img.shields.io/badge/-fmagven93@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white&link=mailto:fmagven93@gmail.com)](mailto:fmagven93@gmail.com)

[![Linkedin Badge](https://img.shields.io/badge/-Felipe-Ventura?style=flat&logo=Linkedin&logoColor=white&color=blue&link=https://www.linkedin.com/in/fmagven/)](https://www.linkedin.com/in/fmagven/)
<p>Contact me anytime!</p> 

<br/><br/>
