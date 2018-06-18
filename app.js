
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')


app.use(morgan('combined'))

app.get('/user/:id', (req, res) => {
    console.log(`Fetching user with id: ${req.params.id}`)
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sean1016',
        database: 'mysql_pratice'
    })

    const userId = req.params.id
    const queryString = 'SELECT * FROM users WHERE id = ?'
    connection.query(queryString, [userId], (err, rows, fields) =>{
        if (err){
            console.log(`Failed to query for users: ${err}`)
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

app.get('/', (req, res) => {
    console.log('Responding to root route')
    res.send('Hello From Sean')
})

app.get('/users', (req, res) => {
    const user1 = {id: 1, firstName: 'Stephen', lastName: 'Curry'}
    const user2 = {id:2 , firstName: 'Klay', lastName: 'Thomphson'}
    res.json([user1, user2])
})

app.listen(3000, () =>{
    console.log('Server is up and listening on 3000...')
})