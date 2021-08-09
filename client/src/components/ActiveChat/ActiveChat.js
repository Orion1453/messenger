import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  let online;
  if (conversation.otherUser) {
    online = props.onlineUsers.includes(conversation.otherUser.id);
  } else {
    online = false;
  }

  return (
    <Box className={classes.root} bgcolor="white">
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={online}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    onlineUsers: state.onlineUsers,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.id === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
