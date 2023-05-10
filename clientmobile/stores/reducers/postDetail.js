import { POST_DETAIL_LOADING, POST_DETAIL_SUCCESS } from "../actions/actionType";

const initialState = {
    postDetail: {},
    loading: false
}

export function postDetailReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POST_DETAIL_SUCCESS:
            return {
                ...state,
                postDetail: payload
            }
        case POST_DETAIL_LOADING:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}