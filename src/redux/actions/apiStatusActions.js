import * as actionTypes from "../actions/actionTypes";

export function beginApiCall() {
  return { type: actionTypes.API_CALL_INPROGRESS };
}

export function apiCallError() {
  return { type: actionTypes.API_CALL_ERROR };
}
