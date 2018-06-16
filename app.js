
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('combined'))

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