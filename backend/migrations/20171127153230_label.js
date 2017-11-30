exports.up = function(knex, Promise) {
  return knex.schema.createTable('label', (table) =>{
    table.increments()
    table.text("label")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('label')
};
