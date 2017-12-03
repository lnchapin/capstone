var express = require('express')
var router = express.Router()
var knex = require('../database/knex.js')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/', function(req, res, next) {
  return knex('task')
  .then(function(task){
    res.send(task);
  })
  return
});

router.post('/userTask', function(req, res, next) {
  let id = req.body.email
  let password = req.body.password

  knex('task').select('*').where('app_users_id', email)
  .then(user => {

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


    router.delete('/:id', function(req, res, next) {
      var blogid = req.params.id
      return knex('blog_post').where("id", blogid).del()
      .then(function(result){
        res.send("blog post has been deleted");
      })
      return
    });

    router.get('/:id', function(req, res, next) {
      var blogid = req.params.id
      return knex('blog_post').where("id", blogid)
      .then(function(blog_post){
        res.send(blog_post);
      })
      return
    });

module.exports = router;
