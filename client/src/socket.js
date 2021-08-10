import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser
} from "./store/conversations";

const token = localStorage.getItem("messenger-token");
const socket = io(window.location.origin, {
  query: {token}
});


socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (onlineUsers) => {
    store.dispatch(addOnlineUser(onlineUsers));
  });

  socket.on("remove-offline-user", (onlineUsers) => {
    store.dispatch(removeOfflineUser(onlineUsers));
  });

  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

export default socket;
