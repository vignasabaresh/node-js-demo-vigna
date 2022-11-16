require('dotenv').config();
const {request, response} = require("express");
const Pool = require('pg').Pool;

const connectionString = process.env.DATABASE_URL
//const pool = new Pool({
   // host : "localhost",
    //user : "postgres",
    //port : 5432,
    //password : "vigna@1234",
    //database : "vigna"
//})

const pool = new Pool({
    connectionString,
    //ssl: {
      //  rejectUnauthorized: false
    //}
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) =>{
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const {first_name, last_name } = request.body
    pool.query('INSERT INTO users (first_name, last_name) VALUES ($1,$2) RETURNING *',[first_name,last_name], (error, results) => {
        if(error) {
            throw error
        }
        response.status(201).send(`Added User: ${results.rows[0].id}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { first_name, last_name } = request.body

    pool.query(
        'UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3',
        [first_name, last_name, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(
        'DELETE FROM users WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User Deleted with ID: ${id}`)
        }
    )
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}