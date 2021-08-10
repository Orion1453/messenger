const router = require("express").Router();
const { Unreads } = require("../../db/models");

function getUnreadSet(unreads) {
  const unreadSet = {};
  
  for (let i = 0; i < unreads.length; i++) {
    const unread = unreads[i];
    const unreadJSON = unread.toJSON();
    unreadSet[unread.senderId] = unreadJSON;
  }
  
  return unreadSet
}

// clear the unread number
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const recipientId = req.user.id;
    const senderId = req.body.sender;
    const unread = await Unreads.findOne({
      where: {
        senderId: senderId,
        recipientId: recipientId,
      },
    });
    if (unread) {
      unread.unreadNum = 0;
      await unread.save();      
    }
    const unreads = await Unreads.findAll({
      where: {
        recipientId: recipientId
      },
    });
    const unreadSet = getUnreadSet(unreads);
    res.json(unreadSet);
  } catch (error) {
    next(error);
  }
});
  
module.exports = router;