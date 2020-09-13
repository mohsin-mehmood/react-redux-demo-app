import React from "react";
import { cleanup, render } from "@testing-library/react";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    errors: {},
    onChange: () => {},
    onSave: () => {},
    saving: false,
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("render add course header", () => {
  const courseForm = renderCourseForm();

  const { getByText } = courseForm;

  getByText("Add Course");
});
