const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

function compareTwoSides(conversation, sender, recipient) {
  return (sender === conversation.user1Id && recipient === conversation.user2Id) || (sender === conversation.user2Id && recipient === conversation.user1Id)
}

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      // check if the sender and recipient all belongs to the conservation
      const supposedConversation = await Conversation.findPk(conversationId);
      if (supposedConversation && compareTwoSides(supposedConversation, senderId, recipientId)) {
        const message = await Message.create({ senderId, text, conversationId });
        return res.json({ message, sender });
      } else {
        return res.status(403).json({"error": "Forbidden action!"})
      }
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
