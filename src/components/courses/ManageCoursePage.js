import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { toast } from "react-toastify";
import { Redirect, Prompt } from "react-router-dom";

export const ManageCoursePage = ({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  isValidSlug,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [unSavedChanges, setUnSavedChanges] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((err) => {
        alert(`Failed loading courses ${err}`);
      });
    } else {
      setCourse(props.course);
    }
    if (authors.length === 0 && isValidSlug) {
      loadAuthors().catch((err) => {
        alert(`Failed loading authors ${err}`);
      });
    }
  }, [props.course]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedCourse = {
      ...course,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    };
    setCourse(updatedCourse);
    setUnSavedChanges(true);
  };

  const IsFormValid = () => {
    const _errors = {};

    if (!course.title) {
      _errors.title = "Title is required";
    }

    if (!course.authorId) {
      _errors.author = "Author is required";
    }

    if (!course.category) {
      _errors.category = "Category is required";
    }

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };
  const handleCourseSave = (event) => {
    event.preventDefault();

    if (IsFormValid()) {
      setSaving(true);
      saveCourse(course)
        .then(() => {
          history.push("/courses");
          toast.success("Course saved successfully!");
        })
        .catch((err) => {
          setSaving(false);
          setErrors({ onSave: err.message });
        });

      setUnSavedChanges(false);
    }
  };

  if (!isValidSlug) {
    return <Redirect to="/course-not-found" />;
  } else {
    return (
      <>
        <CourseForm
          authors={authors}
          course={course}
          courses={courses}
          errors={errors}
          onChange={handleChange}
          onSave={handleCourseSave}
          saving={saving}
        />

        <Prompt
          when={unSavedChanges}
          message="There are unsaved changes, do you wish to discard them?"
        />
      </>
    );
  }
};

const getCourseBySlug = (courses, slug) => {
  return courses.find((c) => c.slug === slug);
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;

  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    courses: state.courses,
    authors: state.authors,
    course,
    isValidSlug: slug ? course !== undefined && course.id !== null : true,
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
