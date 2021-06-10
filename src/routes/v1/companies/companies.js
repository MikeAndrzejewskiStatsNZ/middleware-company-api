const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()
const convert = require('xml-js')
const Company = require('../../../models/company')
require('dotenv/config')

/*
Route: http://example.com/v1/companies/1
Description: Fetches information using the company id.
Discussion note:
Should the XML response be extremely long or frequently visited a caching solution
for the route itself or the returned object could be implemented, I feel it is possibly
out of scope for this exercise.
*/

router.get('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(200)
  // Fetches the appropriate xml document.
  fetch(process.env.COMPANY_XML_API + req.params.id + '.xml')
  // We are fecthing XML so we want to use .text
    .then(res => res.text())
    .then(data => {
      const xmlCon = convert.xml2js(data, { compact: true, spaces: 4 })
      const company = new Company(xmlCon.Data.id._text, xmlCon.Data.name._text, xmlCon.Data.description._text)
      res.type('application/json')
      res.status(200).json(company)
    })
    .catch(error => {
      /* If a non-existent company id is used, the error is caught, becacuse it doesnt exist, in this case,
           I feel sending a 404 will be sufficient,  if this is in development mode we can console log the error.
           If this were a real production application, we could log the error on the server, send it to logstash,
           or whatever is being used to monitor prod
         */
      if (process.env.NODE_ENV === 'development') {
        console.log(error)
      }
      res.sendStatus(404)
    })
})

module.exports = router
