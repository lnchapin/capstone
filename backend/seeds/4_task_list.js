
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('task_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('task_list').insert([
        {
          id: 1,
          task_id: 1,
          task_item: 'home page',
          done: false,
        },
        {
          id: 2,
          task_id: 1,
          task_item: 'log in',
          done: true,
        },
        {
          id: 3,
          task_id: 2,
          task_item: 'hall closet',
          done: false,
        },
        {
          id: 4,
          task_id: 2,
          task_item: 'linen closet',
          done: false,
        },
        {
          id: 5,
          task_id: 3,
          task_item: 'mushrooms',
          done: false,
        },
        {
          id: 6,
          task_id: 3,
          task_item: 'spinach',
          done: false,
        },
      ]);
    });
};
