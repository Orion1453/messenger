const Sequelize = require("sequelize");
const db = require("../db");

const Unread = db.define("unread", {
  sender: {
    type: Sequelize.INTEGER
  },
  recipient: {
    type: Sequelize.INTEGER
  },
  unreadNum: {
    type: Sequelize.INTEGER
  },
});

module.exports = Unread;