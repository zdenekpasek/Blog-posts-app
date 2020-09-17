import createDataContext from "./createDataContext";
import { call } from "react-native-reanimated";
import jsonServer from "../api/jsonServer";

const reducer = (state, action) => {
  // state === [{title: 'fsdfsdf'}, {title: 'dsfdsf'}, {title: 'fdfdf'}]
  // action === {type: 'add' || 'delete' || 'edit', payload: dunno
  switch (action.type) {
    case "get_blogPosts":
      return action.payload;
    case "add_blogPost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "delete_blogPost":
      return state.filter((blogPost) => blogPost.id !== action.payload);

    case "edit_blogPost":
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          return action.payload;
        } else {
          return blogPost;
        }
      });

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogPosts");
    dispatch({ type: "get_blogPosts", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogPosts", { title, content });
    // dispatch({
    //   type: "add_blogPost",
    //   payload: { title, content },
    // });
    callback ? callback() : null;
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogPosts/${id}`, { title, content });
    dispatch({
      type: "edit_blogPost",
      payload: { id, title, content },
    });
    callback ? callback() : null;
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogPosts/${id}`);
    dispatch({ type: "delete_blogPost", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
