
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./routes/user')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.use(router)

app.get('/', (req, res) => {
    console.log('Responding to root route')
    res.send('Hello From Sean')
})

app.listen(3000, () =>{
    console.log('Server is up and listening on 3000...')
})