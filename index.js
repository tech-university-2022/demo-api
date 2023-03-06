const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express()
const port = 10000
const prisma = new PrismaClient()

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.post('/', async (req, res) => {
    console.log(req.body)
    const { email, name } = req.body
    const user = await prisma.user.create({
        data: {
            email,
            name,
        }
    })
    res.send('POST request')
})

app.put('/', (req, res) => {
    res.send('PUT request')
})

app.patch('/', (req, res) => {
    res.send('PATCH request')
})

app.delete('/', (req, res) => {
    res.send('DELETE request')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})