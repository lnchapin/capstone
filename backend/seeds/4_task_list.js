
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
          task_id: 1,
          task_item: 'shared',
          done: true,
        },
        {
          id: 4,
          task_id: 1,
          task_item: 'group',
          done: true,
        },
        {
          id: 5,
          task_id: 1,
          task_item: 'add page',
          done: true,
        },
        {
          id: 6,
          task_id: 2,
          task_item: 'hall closet',
          done: false,
        },
        {
          id: 7,
          task_id: 2,
          task_item: 'linen closet',
          done: false,
        },
        {
          id: 8,
          task_id: 2,
          task_item: 'pantry',
          done: false,
        },
        {
          id: 9,
          task_id: 2,
          task_item: 'front bedroom closet',
          done: false,
        },
        {
          id: 10,
          task_id: 2,
          task_item: 'bedroom closet',
          done: false,
        },
        {
          id: 11,
          task_id: 3,
          task_item: 'mushrooms',
          done: false,
        },
        {
          id: 12,
          task_id: 3,
          task_item: 'spinach',
          done: false,
        },
        {
          id: 13,
          task_id: 3,
          task_item: '2 sweet potatoes',
          done: false,
        },
        {
          id: 14,
          task_id: 3,
          task_item: 'cheese',
          done: false,
        },
        {
          id: 15,
          task_id: 3,
          task_item: 'bread',
          done: false,
        }
      ]);
    })
    .then(function () {
      return knex.raw('alter sequence task_list_id_seq restart with 16')
    })
};
