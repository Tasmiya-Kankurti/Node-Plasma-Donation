const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoURL = require('./config/').mongoURL

const user = require('./src/routes/userRoute')
const post = require('./src/routes/postRoute')
const story = require('./src/routes/storyRoute')
const request = require('./src/routes/requestRoute')
const auth = require('./src/routes/authRoute')
const guidelines = require('./src/routes/guidelineRoute')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useFindAndModify: false, 
    useUnifiedToposlogy: true,
}).then(()=>{
    console.log("Database Successfully connected :)")
}).catch((error)=>{
    console.log(`ERROR: ${error.message}`);
})

const PORT = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.send("Test")
})

app.use('/user', user)
app.use('/post', post)
app.use('/story', story)
app.use('/request',request)
app.use('/auth',auth)
app.use('/guideline',guidelines)

app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`)
})