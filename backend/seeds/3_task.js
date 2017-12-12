
exports.seed = function(knex, Promise) {
  return knex('task').del()
    .then(function () {
      return knex('task').insert([
        {
          id: 1,
          task_name: "Create Wireframes",
          app_users_id: 1,
          label_id: 1,
          date: 'December 28, 2017',
          time: '7:00pm',
          active: true,
        },
        {
          id: 2,
          task_name: "Clean out Closet",
          app_users_id: 1,
          label_id: 2,
          date: 'December 30,2017',
          time: '2:00',
          active: true,
        },
        {
          id: 3,
          task_name: "Grocery Shop for the week",
          app_users_id: 2,
          label_id: 2,
          date: 'December 30,2017',
          time: '4:00',
          active: true,
        },
      ]);
    })
    .then(function () {
      return knex.raw('alter sequence task_id_seq restart with 4')
    })
};
