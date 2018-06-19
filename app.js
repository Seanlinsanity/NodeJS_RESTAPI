
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.post('/user_create', (req, res) =>{
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

function getConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sean1016',
        database: 'mysql_pratice'
    })
}

app.get('/user/:id', (req, res) => {
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

app.get('/', (req, res) => {
    console.log('Responding to root route')
    res.send('Hello From Sean')
})

app.get('/users', (req, res) => {
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
            return {firstName: row.first_name, lastName: row.last_name}
        })
        res.json(users)
    })
})

app.listen(3000, () =>{
    console.log('Server is up and listening on 3000...')
})