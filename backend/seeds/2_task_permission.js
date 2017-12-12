
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('task_permission').del()
    .then(function () {
      // Inserts seed entries
      return knex('task_permission').insert([
        {
          id: 1,
          app_users_id: 1,
          user_id_permitted: 2,
          label_id: 1
        },
        {
          id: 2,
          app_users_id: 2,
          user_id_permitted: 1,
          label_id: 2
        },
        {
          id: 3,
          app_users_id: 3,
          user_id_permitted: 1,
          label_id: 3
        },
        {
          id: 4,
          app_users_id: 1,
          user_id_permitted: 3,
          label_id: 1
        }
      ]);
    })
    .then(function () {
      return knex.raw('alter sequence task_permission_id_seq restart with 5')
    })
};
