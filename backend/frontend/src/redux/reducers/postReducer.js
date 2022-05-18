import * as _state from '../states/postState';
import {
    POSTS_LIST,
    POST_DELETE_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_RESET,
    POST_DELETE_SUCCESS,
    POST_DESTROY_FAIL,
    POST_DESTROY_REQUEST,
    POST_DESTROY_RESET,
    POST_DESTROY_SUCCESS,
    POST_RESTORE_FAIL,
    POST_RESTORE_REQUEST,
    POST_RESTORE_RESET,
    POST_RESTORE_SUCCESS,
    POST_STATUS_FAIL,
    POST_STATUS_REQUEST,
    POST_STATUS_RESET,
    POST_STATUS_SUCCESS,
    SET_POST,
} from '../../constants/postConstant';

const postReducer = (state = _state.postState, action) => {
    switch (action.type) {
        case POSTS_LIST: {
            return {
                ...state,
                posts_list: action.payload,
            };
        }
        case SET_POST: {
            return {
                ...state,
                post: action.payload,
            };
        }

        //STATUS POST TO TRASH
        case POST_STATUS_REQUEST:
            return {
                ...state,
                active: false,
            };
        case POST_STATUS_SUCCESS:
            return {
                ...state,
                active: true,
            };
        case POST_STATUS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case POST_STATUS_RESET:
            return { ...state, active: false, error: '' };

        //PUSH POST TO TRASH
        case POST_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case POST_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case POST_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case POST_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE POST
        case POST_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case POST_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case POST_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case POST_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE POST
        case POST_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case POST_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case POST_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case POST_RESTORE_RESET:
            return { ...state, restore: false, error: '' };

        default:
            return state;
    }
};
export default postReducer;
