const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Unreads = require("./unread");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Unreads.belongsTo(User, { as: "sender" });
Unreads.belongsTo(User, { as: "recipient" });

module.exports = {
  User,
  Conversation,
  Message,
  Unreads
};
