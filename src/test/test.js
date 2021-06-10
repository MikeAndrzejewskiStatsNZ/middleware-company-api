const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()
chai.use(chaiHttp)

describe('/GET Company', () => {
  it('Should return 200', (done) => {
    chai.request(server)
      .get('/v1/companies/1')
      .end((err, res) => {
        console.log(res)
        res.should.have.status(200)
        done()
      })
  })
})
