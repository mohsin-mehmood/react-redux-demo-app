import { courses, newCourse } from "../../../tools/mockData";
import * as actionTypes from "./actionTypes";
import * as courseActions from "./courseActions";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([thunk]);

describe("Async Tests", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Courses Thunk", () => {
    it("test load courses thunk", () => {
      // Mock http calls
      fetchMock.mock("*", {
        body: courses,
        headers: {
          "content-type": "application/json",
        },
      });

      const expectedActions = [
        { type: actionTypes.API_CALL_INPROGRESS },
        { type: actionTypes.LOAD_COURSES_SUCCESS, courses },
      ];

      const store = mockStore({ courses: [] });
      store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("create course thunk", () => {
      const courseToCreate = {
        ...newCourse,
        title: "Test",
        authorId: 1,
        category: "Test",
      };

      const createdCourse = { ...courseToCreate, id: 9999 };

      fetchMock.mock(
        { method: "POST" },
        {
          body: createdCourse,
          headers: { "content-type": "application/json" },
        }
      );

      const expectedActions = [
        { type: actionTypes.API_CALL_INPROGRESS },
        {
          type: actionTypes.CREATE_COURSE_SUCCESS,
          course: createdCourse,
        },
      ];

      const store = mockStore({ courses: [] });
      store.dispatch(courseActions.saveCourse(courseToCreate)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
