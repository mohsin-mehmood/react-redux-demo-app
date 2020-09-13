import React from "react";
import { mount } from "enzyme";
import { authors, courses, newCourse } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";
import { MemoryRouter } from "react-router-dom";
const render = (args) => {
  const defaultProps = {
    authors,
    course: newCourse,
    courses,
    saveCourse: jest.fn(),
    loadCourses: jest.fn(),
    loadAuthors: jest.fn(),
    isValidSlug: true,
    history: {},
    match: {},
  };

  const props = { ...defaultProps, ...args };

  return mount(
    <MemoryRouter>
      <ManageCoursePage {...props} />
    </MemoryRouter>
  );
};

it("sets error when attempt to save course without title", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");

  const error = wrapper.find(".alert").first();

  expect(error.text()).toBe("Title is required");
});
