exports.up = function(knex, Promise) {
  return knex.schema.createTable('app_users', (table) =>{
    table.increments()
    table.text("first_name")
    table.text("last_name")
    table.text("email")
    table.text("password")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('app_users')
};
