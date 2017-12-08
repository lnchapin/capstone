
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('task').del()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        {
          id: 1,
          task_name: "Create Wireframes",
          app_users_id: 1,
          label_id: 1,
          date: new Date(),
          time: '14:00',
          active: true,
        },
        {
          id: 2,
          task_name: "Clean out Closet",
          app_users_id: 1,
          label_id: 2,
          date: new Date(),
          time: '14:00',
          active: true,
        },
        {
          id: 3,
          task_name: "Grocery Shop for the week",
          app_users_id: 2,
          label_id: 2,
          date: new Date(),
          time: '14:00',
          active: true,
        },
      ]);
    })
    .then(function () {
      return knex.raw('alter sequence task_id_seq restart with 4')
    })
};
