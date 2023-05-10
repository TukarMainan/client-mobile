import { POSTS_LOADING, POSTS_SUCCESS } from "../actions/actionType";

const initialState = {
    posts: [],
    loading: false
}

export function postsReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POSTS_SUCCESS:
            return {
                ...state,
                posts: payload
            }
        case POSTS_LOADING:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}