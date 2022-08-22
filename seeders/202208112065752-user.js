'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        first_name: 'naufal',
        last_name: 'naufalsiap',
        email: 'naufal@gmail.com',
        username: 'naufal',
        password: '$2a$10$ZZYz/bUF9y34/6UnG4zMqe7P1nHtSxchY24qekHOuuM4gfsimemgq',
        total_score:'2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'naufal',
        last_name: 'siapokoc',
        email: 'siapokoc@gmail.com',
        username: 'siapokoc',
        password: '$2a$10$ZZYz/bUF9y34/6UnG4zMqe7P1nHtSxchY24qekHOuuM4gfsimemgq',
        total_score:'3',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
