import createDataContext from './createDataContext';
import api from '../services/api';
const blogReducer = (state, action) => {
  switch (action.type) {
    case '@blog/GET_POSTS':
      return action.payload;
    case '@blog/REMOVE_POST':
      return state.filter(item => item.id !== action.payload);
    case '@blog/EDIT_POST':
      return state.map(post => {
        return post.id === action.payload.id ? action.payload : post;
      });
    default:
      return state;
  }
};

const addPost = dispatch => {
  return async ({title, content}, callback) => {
    await api.post('blogposts', {title, content});
    if (callback) {
      callback();
    }
  };
};
const removePost = dispatch => {
  return async id => {
    await api.delete(`/blogposts/${id}`);
    dispatch({
      type: '@blog/REMOVE_POST',
      payload: id,
    });
  };
};

const editPost = dispatch => {
  return async ({id, title, content}, callback) => {
    await api.put(`/blogposts/${id}`, {title, content});

    dispatch({
      type: '@blog/EDIT_POST',
      payload: {id, title, content},
    });
    if (callback) {
      callback();
    }
  };
};

const getBlogPost = dispatch => {
  return async () => {
    const response = await api.get('blogposts');

    dispatch({type: '@blog/GET_POSTS', payload: response.data});
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addPost, removePost, editPost, getBlogPost},
  [],
);
