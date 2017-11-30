var express = require('express')
var router = express.Router()
var knex = require('../database/knex.js')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/', function(req, res, next) {
  return knex('app_users')
  .then(function(app_users){
    res.send(app_users);
  })
  return
});

router.post('/login', function(req, res, next) {
  let email = req.body.email
  let password = req.body.password

  knex('app_users').select('*').where('email', email)
  .then(user => {
    if(user.length === 0){
      res.json({error: 'Email not found, please sign up'})
    } else {
      let hashed = user[0].password
      let match = bcrypt.compareSync(password, hashed)

      if (match) {
        let payload = user[0]
        delete payload.password
        let token = jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET)
        res.json({token})
      } else {
        res.json({error: 'Email and Password do not match, please enter correct password'})
      }
    }
  }

  )
})

router.post('/signup', function(req, res, next){
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let password = req.body.password

  knex('app_users').where('email', email)
    .then(user =>{
      if (user.length === 0) {
        let hash = bcrypt.hashSync(password, 13)
        req.body.password = hash

        knex('app_users').insert(req.body).returning('*')
          .then(newUser => {
            let payload = newUser[0]
            delete payload.password
            let token = jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET)

            res.json({token: token})
          })
      } else {
        res.json({error: 'Email already in use, please log in'})
      }
    })
})

module.exports = router;
