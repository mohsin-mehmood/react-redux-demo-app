import * as authorApi from "../../api/authorApi";
import * as actionTypes from "../actions/actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthors() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch({ type: actionTypes.LOAD_AUTHORS_SUCCESS, authors });
      })
      .catch((err) => {
        dispatch(apiCallError(err));
      });
  };
}

export function saveAuthor(author) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return authorApi.saveAuthor(author).then((savedAuthor) => {
      if (author.id) {
        dispatch({
          type: actionTypes.UPDATE_AUTHOR_SUCCESS,
          author: savedAuthor,
        });
      } else {
        dispatch({
          type: actionTypes.CREATE_AUTHOR_SUCCESS,
          author: savedAuthor,
        });
      }
    });
  };
}

export function deleteAuthor(authorId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_AUTHOR_OPTIMISTIC,
      authorId,
    });
    return authorApi.deleteAuthor(authorId);
  };
}
