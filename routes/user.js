//will contain all of user related router

const express = require('express')
const router = express.Router()
const mysql = require('mysql')

router.get('/messages', (req, res) => {
    console.log('111')
    res.end()
})

router.get('/users', (req, res) => {
    const connection = getConnection()

    const queryString = 'SELECT * FROM users'
    connection.query(queryString, (err, rows, fields) =>{
        if (err){
            console.log(`Failed to query for all users: ${err}`)
            res.sendStatus(500)
            return
        }

        console.log("Fetch mysql users successfully")

        const users = rows.map((row) => {
            return {id: row.id, firstName: row.first_name, lastName: row.last_name}
        })
        res.json(users)
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'sean1016',
    database: 'mysql_pratice'
})

function getConnection(){
    return pool
}

router.get('/user/:id', (req, res) => {
    console.log(`Fetching user with id: ${req.params.id}`)
    const connection = getConnection()

    const userId = req.params.id
    const queryString = 'SELECT * FROM users WHERE id = ?'
    connection.query(queryString, [userId], (err, rows, fields) =>{
        if (err){
            console.log(`Failed to query by userId: ${err}`)
            res.sendStatus(500)
            return
        }

        console.log("Fetch mysql userId successfully")

        const users = rows.map((row) => {
            return {firstName: row.first_name, lastName: row.last_name}
        })
        res.json(users)

    })

})

router.post('/user_create', (req, res) =>{
    console.log('Trying to create a new user...')
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const queryString = 'INSERT INTO users (first_name, last_name) VALUES (?, ?)'
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: ", + results.insertId)
        res.end()

    })
})

module.exports = router