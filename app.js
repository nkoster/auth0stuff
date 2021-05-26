const express = require('express')
const app = express()

require('dotenv').config()

const { auth } = require('express-openid-connect')

app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
)

const port = process.env.PORT || 3005

app.listen(port, _ => console.log(`listening to port ${port}`))
