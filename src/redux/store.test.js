import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import initialState from "../redux/reducers/initialState";
import * as actionTypes from "./actions/actionTypes";

it("Test create course", () => {
  const store = createStore(rootReducer, initialState);

  const newCourse = { title: "New Course" };

  store.dispatch({
    type: actionTypes.CREATE_COURSE_SUCCESS,
    course: newCourse,
  });

  store.dispatch({
    type: actionTypes.CREATE_COURSE_SUCCESS,
    course: newCourse,
  });

  const stateCourse = store.getState().courses[0];

  expect(store.getState().courses.length).toEqual(2);
  expect(stateCourse).toEqual(newCourse);
});
