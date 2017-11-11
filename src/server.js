const path = require('path')
const express = require('express')

const app = express()

app.use('/', express.static(path.resolve('./')))

app.get('/api', (req, res) => {
    res.send('OK!')
})

const codes = [200, 404, 500, 504]

codes.forEach(code => {
    app.get('/api/' + code, (req, res) => {
        console.log(code)
        res.sendStatus(code)
    })
})

app.listen(5000)
console.log('Listening on port 5000')
