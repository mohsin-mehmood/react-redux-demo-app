import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newAuthor } from "../../../tools/mockData";
import TextInput from "../common/TextInput";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import { toast } from "react-toastify";

const ManageAuthor = ({
  author,
  authors,
  loadAuthors,
  saveAuthor,
  history,
}) => {
  const [authorEdit, setAuthorEdit] = useState({ ...author });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((err) => {
        alert("Error while loading authors " + err);
      });
    } else {
      setAuthorEdit(author);
    }
  }, [authors.length]);

  const handleChange = ({ target }) => {
    setAuthorEdit({ ...authorEdit, [target.name]: target.value });
  };

  const IsFormValid = () => {
    const _errors = {};

    if (!authorEdit.name) {
      _errors.name = "Name is required";
    }

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (IsFormValid()) {
      setSaving(true);
      saveAuthor(authorEdit)
        .then(() => {
          history.push("/authors");
          toast.success("Author saved successfully");
        })
        .catch((err) => {
          setSaving(false);
          alert(`Error occurred while saving author: ${err}`);
        });
    }
  };

  return (
    <>
      <h2>{authorEdit ? "Edit" : "Add"} Author</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          name="name"
          value={authorEdit.name}
          onChange={handleChange}
          error={errors.name}
        ></TextInput>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  );
};

ManageAuthor.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  const authorId = ownProps.match.params.authorId;

  return {
    authors: state.authors,
    author:
      authorId && state.authors.length > 0
        ? state.authors.find((a) => a.id === parseInt(authorId, 10))
        : newAuthor,
  };
};

const mapDispatchToProps = {
  loadAuthors,
  saveAuthor,
};

ManageAuthor.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthor);
