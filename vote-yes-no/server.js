const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')

//client gui len voi header...
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))

app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.send('Hello World')
    // res.sendFile('/Users/phuongha/Documents/GitHub/web46-1/vote-yes-no/index.html')
    // res.sendFile(path.resolve(__dirname, './index.html'))

    res.sendFile(path.resolve(__dirname, './public/ask/index.html'))
})

app.post('/create-question', (req, res) => {
    const data = require('./data.json')
    const newQuestion = {
        _id: data.length+1,
        content: req.body.content,
        yes: 0,
        no: 0
    }
    const newData = [...data, newQuestion]
    fs.writeFileSync('data.json', JSON.stringify(newData))
    console.log('vao day', req.body);
    res.send({
        success: 1,
        data: newQuestion
    })
})

app.listen(8080, (err) => {
    if (err) throw err;
    console.log('Server started');
})
