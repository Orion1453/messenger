import React from "react";
import { Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewTextNoUnread: {
    fontSize: 15,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewTextHaveUnread: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: -0.17,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const unreads = props.unread || {};
  let display1, display2;
  if (unreads[otherUser.id] && unreads[otherUser.id].unreadNum > 0) {
    display1 = "none";
    display2 = "";
  } else {
    display1 = "";
    display2 = "none";
  }

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Box display={display1}>
          <Typography className={classes.previewTextNoUnread}>
          {latestMessageText}
          </Typography>
        </Box>
        <Box display={display2}>
          <Typography className={classes.previewTextHaveUnread}>
          {latestMessageText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    unreads: state.unread,
  };
};

export default connect(mapStateToProps)(ChatContent);
