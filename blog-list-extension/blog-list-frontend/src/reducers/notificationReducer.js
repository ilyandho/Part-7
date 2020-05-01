/* eslint-disable indent */

const notificationReducer = (
  state = { message: null, messageType: 'no-message' },
  action
) => {
  switch (action.type) {
    case 'NO-MESSAGE':
      return { message: null, messageType: 'no-message' };
    case 'MESSAGE':
      return action.data;
    default:
      return state;
  }
};

export const setMessage = (message = null) => {
  if (!message) {
    return (dispatch) => {
      dispatch({
        type: 'NO-MESSAGE',
        data: message,
      });
    };
  }
  return (dispatch) => {
    dispatch({
      type: 'MESSAGE',
      data: message,
    });
  };
};

export default notificationReducer;
