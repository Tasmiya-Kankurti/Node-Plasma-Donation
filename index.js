const express = require('express')
const bodyParser = require('body-parser')
const user = require('./src/routes/userRoute')
const post = require('./src/routes/postRoute')
const story = require('./src/routes/storyRoute')
const request = require('./src/routes/requestRoute')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const PORT = 3000

app.get('/',(req,res) => {
    res.send("Test")
})

app.use('/user', user)
app.use('/post', post)
app.use('/story', story)
app.use('/request',request)

app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`)
})