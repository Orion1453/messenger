const GET_UNREADS = "GET_UNREADS";

// ACTION CREATORS

export const gotUnreads = (unreads) => {
  return {
    type: GET_UNREADS,
    unreads,
  };
};

const reducer = (state = [], action) => {
    switch (action.type) {
      case GET_UNREADS:
        return action.unreads;
      default:
        return state;
    }
  };
  
  export default reducer;