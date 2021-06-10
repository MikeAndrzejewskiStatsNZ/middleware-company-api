/* This is the index file for the MiddleWare Developers evaluation.
Created by: Michael Andrzejewski, June 2021
*/
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const companiesRoute = require('./routes/v1/companies/companies')

// Nothing really specified about versioning or how many other routes there could be, so i made this pretty rudimentary.
app.use('/v1/companies', companiesRoute)

// Holding text for the home page
app.get('/', (req, res) => {
  res.send('Welcome to the middleware api test')
})

// Just redirecting if the routes are note found
app.all('*', function (req, res) {
  res.redirect('/')
})

app.listen(port, () => console.log(`Node server running on port: ${port}`))
