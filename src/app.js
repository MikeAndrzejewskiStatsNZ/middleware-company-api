/* This is the index file for the MiddleWare Developers evaluation.
Created by: Michael Andrzejewski, June 2021
*/
const express = require('express')
const app = express()
const port = 3000
const companiesRoute = require('./routes/v1/companies/companies')

// Nothing really specified about versioning or how many other routes there could be, so i made this pretty rudimentary.
app.use('/v1/companies', companiesRoute)

app.listen(port, () => console.log(`Node server running on port: ${port}`))
