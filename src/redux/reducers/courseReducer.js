import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case actionTypes.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    case actionTypes.UPDATE_COURSE_SUCCESS:
      return state.map((c) => (c.id === action.course.id ? action.course : c));
    case actionTypes.DELETE_COURSE_OPTIMISTIC:
      return state.filter((c) => c.id !== action.courseId);
    case actionTypes.SORT_COURSES:
      return state
        .map((course) => {
          return {
            ...course,
            authorName: action.authors.find((a) => a.id === course.authorId)
              .name,
          };
        })
        .sort((a, b) => (a[action.sortBy] > b[action.sortBy] ? 1 : -1));
    default:
      return state;
  }
}
