import * as _state from '../states/categoryState';
import {
    CATE_DELETE_FAIL,
    CATE_DELETE_REQUEST,
    CATE_DELETE_RESET,
    CATE_DELETE_SUCCESS,
    CATE_DESTROY_FAIL,
    CATE_DESTROY_REQUEST,
    CATE_DESTROY_RESET,
    CATE_DESTROY_SUCCESS,
    CATE_LIST,
    CATE_RESTORE_FAIL,
    CATE_RESTORE_REQUEST,
    CATE_RESTORE_RESET,
    CATE_RESTORE_SUCCESS,
    CATE_STATUS_FAIL,
    CATE_STATUS_REQUEST,
    CATE_STATUS_RESET,
    CATE_STATUS_SUCCESS,
    SET_CATE,
} from '../../constants/categoryConstant';

const categoryReducer = (state = _state.categoryState, action) => {
    switch (action.type) {
        case CATE_LIST: {
            return {
                ...state,
                categories: action.payload,
            };
        }
        case SET_CATE: {
            return {
                ...state,
                category: action.payload,
            };
        }

        //STATUS CATE TO TRASH
        case CATE_STATUS_REQUEST:
            return {
                ...state,
                active: false,
            };
        case CATE_STATUS_SUCCESS:
            return {
                ...state,
                active: true,
            };
        case CATE_STATUS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CATE_STATUS_RESET:
            return { ...state, active: false, error: '' };

        //PUSH CATE TO TRASH
        case CATE_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case CATE_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case CATE_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CATE_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE CATE
        case CATE_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case CATE_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case CATE_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CATE_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE CATE
        case CATE_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case CATE_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case CATE_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CATE_RESTORE_RESET:
            return { ...state, restore: false, error: '' };

        default:
            return state;
    }
};
export default categoryReducer;
