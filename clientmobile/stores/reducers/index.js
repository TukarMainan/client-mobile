import { combineReducers } from "redux";
import { postsReducer } from "./posts";

export const rootReducer = combineReducers({
    posts: postsReducer,
})