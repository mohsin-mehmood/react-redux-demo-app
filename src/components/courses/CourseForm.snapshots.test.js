import React from "react";
import CourseForm from "./CourseForm";
import { authors, courses } from "../../../tools/mockData";
import renderer from "react-test-renderer";

it("set save button label 'Saving...' when onsaving is true", () => {
  // Arrange
  const courseForm = (
    <CourseForm
      authors={authors}
      course={courses[0]}
      onChange={jest.fn()}
      onSave={jest.fn()}
      saving
    />
  );

  // Act
  const tree = renderer.create(courseForm);

  // Assert
  expect(tree).toMatchSnapshot();
});

it("set save button label 'Save' when onsaving is false", () => {
  // Arrange
  const courseForm = (
    <CourseForm
      authors={authors}
      course={courses[0]}
      onChange={jest.fn()}
      onSave={jest.fn()}
      saving={false}
    />
  );

  // Act
  const tree = renderer.create(courseForm);

  // Assert
  expect(tree).toMatchSnapshot();
});

it("set save button label 'Save' when onsaving is false", () => {
  // Arrange
  const courseForm = (
    <CourseForm
      authors={authors}
      course={courses[0]}
      onChange={jest.fn()}
      onSave={jest.fn()}
      saving={false}
    />
  );

  // Act
  const tree = renderer.create(courseForm);

  // Assert
  expect(tree).toMatchSnapshot();
});
