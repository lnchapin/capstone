
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('label').del()
    .then(function () {
      // Inserts seed entries
      return knex('label').insert([
        {
          id: 1,
          label: 'family',
        },
        {
          id: 2,
          label: 'spouse',
        },
        {
          id: 3,
          label: 'sister',
        }
      ]);
    });
};
