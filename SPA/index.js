const express = require('express')
const app = express()
const http = require('http')
const fs = require('fs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/user',require('./routes/api/users'))

app.listen(3000,() => {
    console.log('Server strated on port 3000')
})

