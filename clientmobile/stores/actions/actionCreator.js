import axios from "axios";
import { BASE_URL } from "../../config/api";
import { POSTS_SUCCESS, POSTS_LOADING } from "./actionType";

export const fetchPostsLoading = (payload) => {
    return {
        type: POSTS_LOADING,
        payload: payload
    }
}

export const fetchPosts = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchPostsLoading(true));
            const { data } = await axios.get(BASE_URL + "/public/posts");
            dispatch({
                type: POSTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(fetchPostsLoading(false));
        }
    }
}