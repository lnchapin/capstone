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

router.post('/create', function(req, res, next){
  knex('task').insert({
    task_name: req.body.task_name,
    app_users_id: req.body.app_users_id,
    label_name: 1,
    date: req.body.date,
    time: req.body.time,
    active: true
  })
  .then(function(result){
    res.json({message: "task successfully posted", results: result});
  })
return
})

// router.put('/update/:id', function(req, res, next) {
//   let task_id =  ****should we Async Data task_id****
//   return knex('task').where("id", task_id).update({
//     task_name: req.body.task_name,
//     app_users_id: ****Async Data app_users_id****,
//     label_name: req.body.label,
//     date: req.body.date,
//     time: req.body.time,
//     active: true,
//     })
//   .then(function(result){
//     res.send("task successfully edited");
//   })
//   return
// });
//
// router.put('/finished/:id', function(req, res, next) {
//   let task_id =  ****should we Async Data task_id****
//   return knex('task').where("id", task_id).update({
//     active: false,
//     })
//   .then(function(result){
//     res.send("task successfully finished");
//   })
//   return
// });
//
// // router.delete('/:id', function(req, res, next) {
// //   let task_id =  ****should we Async Data task_id****
// //   return knex('task').where("id", task_id).del()
// //   .then(function(result){
// //     res.send("Task has been deleted");
// //   })
// //   return
// // });
//
router.get('/:id', function(req, res, next) {
  var task_id = req.params.id
  return knex('task').where("id", task_id)
  .then(function(task){
    res.send(task)
  })
  return
})

router.get('/user/:id', function(req, res, next) {
  var app_users_id = req.params.id
  return knex('task').where("app_users_id", app_users_id)
  .then(function(task){
    res.send(task)
  })
  return
})

module.exports = router;
