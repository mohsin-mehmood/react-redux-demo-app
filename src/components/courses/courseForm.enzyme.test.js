import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

function renderShallowForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    errors: {},
    onChange: () => {},
    onSave: () => {},
    saving: false,
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderShallowForm();
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it("set form save button text onsaving false", () => {
  const wrapper = renderShallowForm();
  expect(wrapper.find("button").text()).toEqual("Save");
});

it("set form save button text onsaving true", () => {
  const wrapper = renderShallowForm({ saving: true });
  expect(wrapper.find("button").text()).toEqual("Saving...");
});
