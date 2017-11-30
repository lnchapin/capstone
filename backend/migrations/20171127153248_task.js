exports.up = function(knex, Promise) {
  return knex.schema.createTable('task', (table) =>{
    table.increments()
    table.text("task_name")
    table.integer("app_users_id")
      .references("app_users.id")
      .onDelete("CASCADE")
    table.integer("label_id")
      .references("label.id")
      .onDelete("CASCADE")
    table.date("date")
    table.time("time")
    table.boolean("active")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('task')
};
