var express = require('express')
var router = express.Router()
var knex = require('../database/knex.js')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/', function(req, res, next) {
  return knex('task_permission')
  .then(function(task_permission){
    res.send(task_permission);
  })
  return
});

// router.post('/create', function(req, res, next){
//   knex('task_permission').insert({
//     app_users_id: ****Async Data app_users_id****,
//     user_id_permitted: ***id where App user email = email put in***,
//     label_id: ***id where label = label put in***,
//   })
//   .then(function(result){
//     res.send("task successfully posted");
//   })
// return
// })
//
// router.put('/update/:id', function(req, res, next) {
//   let task_permitted_id =  ****should we Async Data this data****
//   return knex('task_permission').where("id", task_permitted_id).update({
//    user_id_permitted: ***id where App user email = email put in***,
//     })
//   .then(function(result){
//     res.send("task successfully edited");
//   })
//   return
// });
//
// router.delete('/:id', function(req, res, next) {
//   let user_id_permitted =  ****should we Async Data this data****
//   return knex('task_permission').where("id", user_id_permitted).del()
//   .then(function(result){
//     res.send("User no longer has access");
//   })
//   return
// });
//
router.get('/:id', function(req, res, next) {
  var task_permission_id = req.params.id
  return knex('task_permission').where("id", task_permission_id)
  .then(function(task_permission){
    res.send(task_permission)
  })
  return
})

router.get('/user/:id', function(req, res, next) {
  var app_users_id = req.params.id
  return knex('task_permission').where("app_users_id", app_users_id)
  .then(function(task_permission){
    res.send(task_permission)
  })
  return
})

module.exports = router;
