import * as actionTypes from "../actions/actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCourses() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch({ type: actionTypes.LOAD_COURSES_SUCCESS, courses });
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveCourse(course) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        if (course.id) {
          dispatch({
            type: actionTypes.UPDATE_COURSE_SUCCESS,
            course: savedCourse,
          });
        } else {
          dispatch({
            type: actionTypes.CREATE_COURSE_SUCCESS,
            course: savedCourse,
          });
        }
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deleteCourse(courseId) {
  return (dispatch) => {
    // Optimistic delete as we are dispatching action before firing the API call
    dispatch({ type: actionTypes.DELETE_COURSE_OPTIMISTIC, courseId });
    return courseApi.deleteCourse(courseId);
  };
}

export function sortCourses(sortBy, authors) {
  return {
    type: actionTypes.SORT_COURSES,
    sortBy: sortBy,
    authors: authors,
  };
}
