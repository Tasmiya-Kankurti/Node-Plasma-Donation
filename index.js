const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoURL = require('./config/').mongoURL

const donor = require('./src/routes/donorRoute')
const receiver =require('./src/routes/receiverRoute')
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
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Successfully connected :)")
}).catch((error)=>{
    console.log(`ERROR: ${error.message}`);
})

const PORT = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.send("Test")
})

app.use('/api/donor', donor)
app.use('/api/receiver',receiver)
app.use('/api/post', post)
app.use('/api/story', story)
app.use('/api/request',request)
app.use('/api/auth',auth)
app.use('/api/guideline',guidelines)

app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`)
})