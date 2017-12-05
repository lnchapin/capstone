var express = require('express')
var router = express.Router()
var knex = require('../database/knex.js')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/', function(req, res, next) {
  return knex('label')
  .then(function(label){
    res.send(label);
  })
  return
});

// router.post('/create', function(req, res, next){
//   knex('label').insert({
//     label: req.body.label,
//   })
//   .then(function(result){
//     res.send("label created");
//   })
// return
// })
//
// router.put('/update/:id', function(req, res, next) {
//   let label_id =  ****should we Async Data label_id****
//   return knex('label').where("id", label_id).update({
//     label: req.body.label,
//     })
//   .then(function(result){
//     res.send("label successfully edited");
//   })
//   return
// });
//
// router.delete('/:id', function(req, res, next) {
//   let label_id =  ****should we Async Data label_id****
//   return knex('label').where("id", task_id).del()
//   .then(function(result){
//     res.send("label has been deleted");
//   })
//   return
// });
//
router.get('/:id', function(req, res, next) {
  var label_id = req.params.id
  return knex('label').where("id", label_id)
  .then(function(label){
    res.send(label)
  })
  return
})

router.get('/users/:id', function(req, res, next) {
  var app_users_id = req.params.id
  return knex('label').where("app_users_id", app_users_id)
  .then(function(label){
    res.send(label)
  })
  return
})

module.exports = router;
