import {
    PAGES_LIST,
    PAGE_DELETE_FAIL,
    PAGE_DELETE_REQUEST,
    PAGE_DELETE_RESET,
    PAGE_DELETE_SUCCESS,
    PAGE_DESTROY_FAIL,
    PAGE_DESTROY_REQUEST,
    PAGE_DESTROY_RESET,
    PAGE_DESTROY_SUCCESS,
    PAGE_RESTORE_FAIL,
    PAGE_RESTORE_REQUEST,
    PAGE_RESTORE_RESET,
    PAGE_RESTORE_SUCCESS,
    SET_PAGE,
} from '../../constants/pageConstant';
import * as _state from '../states/pageState';

const pageReducer = (state = _state.pageState, action) => {
    switch (action.type) {
        case PAGES_LIST: {
            return {
                ...state,
                pages_list: action.payload,
            };
        }
        case SET_PAGE: {
            return {
                ...state,
                page: action.payload,
            };
        }

        //PUSH PAGE TO TRASH
        case PAGE_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case PAGE_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case PAGE_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case PAGE_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE PAGE
        case PAGE_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case PAGE_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case PAGE_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case PAGE_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE PAGE
        case PAGE_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case PAGE_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case PAGE_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case PAGE_RESTORE_RESET:
            return { ...state, restore: false, error: '' };

        default:
            return state;
    }
};
export default pageReducer;
