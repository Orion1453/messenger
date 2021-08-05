import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Search, Chat, CurrentUser } from "./index.js";

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const conversations = props.conversations || [];
  const unreads = props.unreads || {};
  const { handleChange, searchTerm } = props;

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) => conversation.otherUser.username.includes(searchTerm))
        .map((conversation) => {
          let unreadNum, invisible;
          if (unreads[conversation.otherUser.id] && unreads[conversation.otherUser.id].unreadNum > 0) {
            unreadNum = unreads[conversation.otherUser.id].unreadNum;
            invisible = false;
          } else {
            unreadNum = 0;
            invisible = true;
          }
          return <Chat conversation={conversation} unreadNum={unreadNum} invisible={invisible} key={conversation.otherUser.username} />;
        })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations,
    unreads: state.unread,
  };
};

export default connect(mapStateToProps)(Sidebar);
