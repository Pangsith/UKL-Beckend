"use strict";
let md5 = require("md5");
const now = new Date();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("admin", [
      {
        name: "Rafi",
        email: "admin@smktelkom-mlg.sch.id",
        password: md5("12345"),
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admin", null, {});
  },
};
