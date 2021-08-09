const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";

export const addOnlineUser = (onlineUsers) => {
    return {
      type: ADD_ONLINE_USER,
      onlineUsers,
    };
  };
  
export const removeOfflineUser = (onlineUsers) => {
    return {
      type: REMOVE_OFFLINE_USER,
      onlineUsers,
    };
};

const reducer = (state = [], action) => {
    switch (action.type) {
      case ADD_ONLINE_USER: {
        return action.onlineUsers;
      }
      case REMOVE_OFFLINE_USER: {
        return action.onlineUsers;
      }
      default:
        return state;
    }
  };
  
export default reducer;