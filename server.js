require('dotenv').config()
const express =require('express')
const cors = require ('cors')
const router = require('./routes/index')
require('./config/database')
const passport = require('passport')
require('./config/passport')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(express.static('assets'))


app.use('/api', router)


app.listen(4000, () => console.log("App listening on port 4000"))