exports.up = function(knex, Promise) {
  return knex.schema.createTable('task_list', (table) =>{
    table.increments()
    table.integer("task_id")
      .references("task.id")
      .onDelete("CASCADE")
    table.text("task_item")
    table.boolean("done")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('task_list')
};
