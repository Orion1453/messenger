const router = require("express").Router();
const { User, Conversation, Message, Unread } = require("../../db/models");
const { Op } = require("sequelize");

function getUnreadSet(unreads) {
  const unreadSet = {};
  
  for (let i = 0; i < unreads.length; i++) {
    const unread = unreads[i];
    const unreadJSON = unread.toJSON();
    unreadSet[unread.sender] = unreadJSON;
  }
  
  return unreadSet
}

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;

      // reverse the messages order
      convoJSON.messages.reverse();
      conversations[i] = convoJSON;
    }

    const unreads = await Unread.findAll({
      where: {
        recipient: userId
      },
    });
    const unreadSet = getUnreadSet(unreads);

    res.json({
      conversations: conversations,
      unreads: unreadSet,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
