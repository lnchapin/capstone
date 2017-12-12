exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('app_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('app_users').insert([
        {
          id: 1,
          first_name: 'Lindsay',
          last_name: 'Chapin',
          email: 'lindsay@lindsay.com',
          password: '$2a$13$CiRpEgaSnbGd.zCscx99cuZFs3jSlQwkqEO140x9veCaP3zZ6fZlm'
        },
        {
          id: 2,
          first_name: 'Alex',
          last_name: 'Chapin',
          email: 'alex@alex.com',
          password: '$2a$13$CiRpEgaSnbGd.zCscx99cuZFs3jSlQwkqEO140x9veCaP3zZ6fZlm'
        },
        {
          id: 3,
          first_name: 'Lydia',
          last_name: 'Page',
          email: 'lydia@lydia.com',
          password: '$2a$13$CiRpEgaSnbGd.zCscx99cuZFs3jSlQwkqEO140x9veCaP3zZ6fZlm'
        }
      ]);
    })
    .then(function () {
      return knex.raw('alter sequence app_users_id_seq restart with 4')
    })
};
