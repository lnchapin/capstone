
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('label').del()
    .then(function () {
      // Inserts seed entries
      return knex('label').insert([
        {
          id: 1,
          app_users_id: 1,
          label: 'family',
        },
        {
          id: 2,
          app_users_id: 1,
          label: 'spouse',
        },
        {
          id: 3,
          app_users_id: 2,
          label: 'family',
        },
        {
          id: 4,
          app_users_id: 2,
          label: 'spouse',
        },
        {
          id: 5,
          app_users_id: 1,
          label: 'spouse',
        }
      ]);
    })
    .then(function () {
      return knex.raw('alter sequence label_id_seq restart with 6')
    })
};
