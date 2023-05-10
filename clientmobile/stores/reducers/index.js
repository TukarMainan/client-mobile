import { combineReducers } from "redux";
import { postsReducer } from "./posts";
import { postDetailReducer } from "./postDetail";

export const rootReducer = combineReducers({
    posts: postsReducer,
    postDetail: postDetailReducer,
})