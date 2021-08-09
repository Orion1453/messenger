import React, { Component } from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { clearUnreads } from "../../store/utils/thunkCreators";

const styles = {
  root: {
    display: "flex",
    width: "90%"
  },
  row: {
    display: "flex",
    borderRadius: 8,
    height: 80,
    boxShadow: "10px 10px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  }
};

class Chat extends Component {
  handleClick = async (conversation) => {
    const reqBody = {
      sender: this.props.conversation.otherUser.id,
    };
    await this.props.setActiveChat(conversation.otherUser.id);
    await this.props.clearUnreads(reqBody);
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const online = this.props.onlineUsers.includes(otherUser.id);
    const invisible = this.props.invisible;
    const unreadNum = this.props.unreadNum;
    const activeChat = this.props.activeChat;
    let color;
    if (otherUser.id === activeChat) {
      color = "#FFFFFF";
    } else {
      color = "#FCFFFF ";
    }
    return (
      <Box bgcolor={color} className={classes.row}>
        <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}>
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
      </Box>
      <Badge badgeContent={unreadNum} color="primary" invisible={invisible} max={99}></Badge>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeChat: state.activeConversation,
    onlineUsers: state.onlineUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    clearUnreads: (body) => {
      dispatch(clearUnreads(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
