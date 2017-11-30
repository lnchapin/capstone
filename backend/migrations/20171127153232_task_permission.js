exports.up = function(knex, Promise) {
  return knex.schema.createTable('task_permission', (table) =>{
    table.increments()
    table.integer("app_users_id")
      .references("app_users.id")
      .onDelete("CASCADE")
    table.integer("user_id_permitted")
    table.integer("label_id")
    .references("label.id")
    .onDelete("CASCADE")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('task_permission')
};
