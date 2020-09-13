import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadAuthors, deleteAuthor } from "../../redux/actions/authorActions";
import { loadCourses } from "../../redux/actions/courseActions";

import PropTypes from "prop-types";
import AuthorsList from "./AuthorsList";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const AuthorsPage = ({ authors, courses, ...props }) => {
  useEffect(() => {
    if (authors.length === 0) {
      props.loadAuthors().catch((err) => {
        alert(`Failed loading authors ${err}`);
      });
    }
    if (courses.length === 0) {
      props.loadCourses().catch((err) => {
        alert(`Failed loading courses ${err}`);
      });
    }
  }, [authors.length, courses.length]);

  const deleteAuthor = (authorId) => {
    if (courses.filter((c) => c.authorId === authorId).length === 0) {
      props
        .deleteAuthor(authorId)
        .then(toast.success("Author deleted successfully"))
        .catch((err) => {
          toast.error(`Error deleting author ${err}`);
        });
    } else {
      alert("This author has active courses.");
    }
  };

  return (
    <>
      <h2>Authors</h2>
      <NavLink className="btn btn-primary" to="/author">
        Add Author
      </NavLink>
      <div className="pt-3">
        <AuthorsList authors={authors} onDelete={deleteAuthor} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authors: state.authors,
    courses: state.courses,
  };
};

const mapDispatchToProps = {
  loadAuthors,
  deleteAuthor,
  loadCourses,
};

AuthorsPage.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
