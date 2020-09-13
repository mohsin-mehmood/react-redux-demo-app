import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorsList = ({ authors, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => {
          return (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>
                <Link to={`author/${author.id}`}>{author.name}</Link>{" "}
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    onDelete(author.id);
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
  );
};

AuthorsList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default AuthorsList;
