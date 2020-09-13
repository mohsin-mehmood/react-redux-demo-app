import courseReducer from "./courseReducer";
import * as actionTypes from "../actions/actionTypes";

describe("Course Reducer Tests", () => {
  it("create course reducer test", () => {
    // Arrange
    const initialState = [
      {
        title: "A",
      },
      { title: "B" },
    ];

    const newCourse = { title: "C" };

    //Act
    const newState = courseReducer(initialState, {
      type: actionTypes.CREATE_COURSE_SUCCESS,
      course: newCourse,
    });

    // Assert
    expect(newState.length).toEqual(3);
    expect(newState[1].title).toEqual("B");
    expect(newState[2].title).toEqual("C");
  });

  it("update course reducer test", () => {
    // Arrange
    const initialState = [
      {
        id: 1,
        title: "A",
      },
      { id: 2, title: "B" },
    ];

    const updateCourse = { id: 2, title: "New Title" };

    //Act
    const newState = courseReducer(initialState, {
      type: actionTypes.UPDATE_COURSE_SUCCESS,
      course: updateCourse,
    });

    // Assert
    expect(newState.length).toEqual(2);
    expect(newState[0].title).toEqual("A");
    expect(newState[1].title).toEqual("New Title");
  });
});
