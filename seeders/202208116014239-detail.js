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
     await queryInterface.bulkInsert('details', [
      {
        gameId: '1',
        userId: '1',
        score: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gameId: '1',
        userId: '2',
        score: '0',
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
     await queryInterface.bulkDelete('details', null, {});
  }
};
