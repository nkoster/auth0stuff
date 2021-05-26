const express = require('express')
const app = express()

require('dotenv').config()

const { auth, requiresAuth } = require('express-openid-connect')

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
)

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'logged in' : 'logged out')
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(req.oidc.user)
})

const port = process.env.PORT || 3005

app.listen(port, _ => console.log(`listening to port ${port}`))
