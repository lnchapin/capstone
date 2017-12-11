var express = require('express')
var router = express.Router()
var knex = require('../database/knex.js')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/', function(req, res, next) {
  return knex('task_list')
  .then(function(task){
    res.send(task);
  })
  return
});

router.post('/create', function(req, res, next){
  knex('task_list').insert(req.body)
  .then(function(result){
    res.send("task item successfully posted");
  })
return
})

// router.put('/update/:id', function(req, res, next) {
//   let task_id =  ****should we Async Data task_id****
//   return knex('task_list').where("id", task_id).update({
//     task_item: req.body.item,
//     done: false,
//     })
//   .then(function(result){
//     res.send("task successfully edited");
//   })
//   return
// });

router.put('/finished/:id', function(req, res, next) {
  let task_id =  req.body.id
  return knex('task_list').where("id", task_id).update({
    done: req.body.done,
    })
  .then(function(result){
    res.json({message: "task successfully finished"});
  })
  return
});

// router.delete('/:id', function(req, res, next) {
//   let task_id =  ****should we Async Data task_id****
//   return knex('task_list').where("id", task_id).del()
//   .then(function(result){
//     res.send("Task has been deleted");
//   })
//   return
// });
//
router.get('/:id', function(req, res, next) {
  var task_id = req.params.id
  return knex('task_list').where("id", task_id)
  .then(function(task){
    res.send(task)
  })
  return
})

router.get('/task/:id', function(req, res, next) {
  var task_id = req.params.id
  return knex('task_list').where("task_id", task_id)
  .then(function(task){
    res.send(task)
  })
  return
})

module.exports = router;
