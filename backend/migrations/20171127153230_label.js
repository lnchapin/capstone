exports.up = function(knex, Promise) {
  return knex.schema.createTable('label', (table) =>{
    table.increments()
    table.integer("app_users_id")
      .references("app_users.id")
      .onDelete("CASCADE")
    table.text("label")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('label')
};
