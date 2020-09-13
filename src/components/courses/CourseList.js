import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SelectInput from "../common/SelectInput";

const CourseList = ({ courses, onDelete, sortOptions, onSortChanged }) => (
  <>
    <div className="float-right col-3">
      <SelectInput
        options={sortOptions}
        name="sortBy"
        label="Sort By"
        onChange={onSortChanged}
      ></SelectInput>
    </div>
    <table className="table" hidden={courses.length === 0}>
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => {
          return (
            <tr key={course.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + course.slug}
                >
                  Watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    onDelete(course.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    {courses.length === 0 && <div>No courses available!</div>}
  </>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  sortOptions: PropTypes.array.isRequired,
  onSortChanged: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CourseList;
