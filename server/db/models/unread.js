const Sequelize = require("sequelize");
const db = require("../db");

const Unreads = db.define("unreadMessage", {
  unreadNum: {
    type: Sequelize.INTEGER
  },
});

module.exports = Unreads;