import { combineReducers } from "redux";
import courses from "../reducers/courseReducer";
import authors from "../reducers/authorReducer";
import apiCallsInProgress from "../reducers/apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;
