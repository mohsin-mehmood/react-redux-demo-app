import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { NavLink } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((err) => {
        alert(`Failed loading courses ${err}`);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((err) => {
        alert(`Failed loading authors ${err}`);
      });
    }
  }

  handleDeleteCourse = async (courseId) => {
    toast.success("Course deleted!");
    try {
      await this.props.actions.deleteCourse(courseId);
    } catch (err) {
      toast.error(`Error deleting course ${err.message}`, { autoClose: false });
    }
  };

  handleSortChanged = (event) => {
    const sortBy = event.target.value;

    this.props.actions.sortCourses(sortBy || "id", this.props.authors);
  };

  render() {
    return (
      <>
        <h2>Courses</h2>
        <div>Total Courses {this.props.courses.length}</div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <NavLink className="btn btn-primary" to="/course">
              Add Course
            </NavLink>
            <div className="pt-3">
              <CourseList
                courses={this.props.courses}
                onDelete={this.handleDeleteCourse}
                sortOptions={[
                  { value: "title", text: "Title" },

                  { value: "authorName", text: "Author" },
                  { value: "category", text: "Category" },
                ]}
                onSortChanged={this.handleSortChanged}
              />
            </div>
          </>
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  const courses =
    state.authors.length === 0
      ? []
      : state.courses.map((course) => {
          return {
            ...course,
            authorName: state.authors.find((a) => a.id === course.authorId)
              .name,
          };
        });

  return {
    courses,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (_course) => dispatch(courseActions.createCourse(_course)),
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      sortCourses: bindActionCreators(courseActions.sortCourses, dispatch),
    },
  };
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
