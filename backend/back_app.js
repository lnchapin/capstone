var express = require('express')
var app = express()
var knex = require('knex')
var cors = require('cors')
var bodyParser = require('body-parser')
var knexdb = require('./database/knex.js')
var users = require('./routes/users')
var port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use("/api/v1/users", users)
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.use(function (req, res, next) {
  console.error(err.stack)
  res.status(404).send('404, route not found')
})


app.listen(port, function() {
  console.log('Listening on port', port)
})

module.exports = app
