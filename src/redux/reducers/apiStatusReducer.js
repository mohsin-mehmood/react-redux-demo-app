import initialState from "../reducers/initialState";
import * as actionTypes from "../actions/actionTypes";

const actionTypeEndsInSuccess = (type) => {
  return type.substring(type.length - 8) === "_SUCCESS";
};

const apiStatusReducer = (state = initialState.apiCallsInProgress, action) => {
  if (action.type === actionTypes.API_CALL_INPROGRESS) {
    return state + 1;
  } else if (
    actionTypeEndsInSuccess(action.type) ||
    action.type === actionTypes.API_CALL_ERROR
  ) {
    return state - 1;
  }

  return state;
};

export default apiStatusReducer;
