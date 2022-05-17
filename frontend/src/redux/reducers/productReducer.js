import * as _state from '../states/productState';
import {
    PRODUCTS_LIST,
    COLORS_LIST,
    SIZES_LIST,
    SET_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    PRODUCTS_SEARCH,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_CREATE_RESET,
    PRODUCT_MARK_ALL_REQUEST,
    PRODUCT_MARK_ALL_SUCCESS,
    PRODUCT_MARK_ALL_FAIL,
    PRODUCT_MARK_ALL_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_RESET,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DESTROY_REQUEST,
    PRODUCT_DESTROY_SUCCESS,
    PRODUCT_DESTROY_FAIL,
    PRODUCT_DESTROY_RESET,
    PRODUCT_RESTORE_REQUEST,
    PRODUCT_RESTORE_SUCCESS,
    PRODUCT_RESTORE_FAIL,
    PRODUCT_RESTORE_RESET,
    PRODUCT_STATUS_REQUEST,
    PRODUCT_STATUS_SUCCESS,
    PRODUCT_STATUS_FAIL,
    PRODUCT_STATUS_RESET,
    COLOR_DELETE_REQUEST,
    COLOR_DELETE_SUCCESS,
    COLOR_DELETE_FAIL,
    COLOR_DELETE_RESET,
    COLOR_DESTROY_REQUEST,
    COLOR_DESTROY_SUCCESS,
    COLOR_DESTROY_FAIL,
    COLOR_DESTROY_RESET,
    COLOR_RESTORE_REQUEST,
    COLOR_RESTORE_SUCCESS,
    COLOR_RESTORE_FAIL,
    COLOR_RESTORE_RESET,
    SIZE_DELETE_REQUEST,
    SIZE_DELETE_SUCCESS,
    SIZE_DELETE_FAIL,
    SIZE_DELETE_RESET,
    SIZE_DESTROY_REQUEST,
    SIZE_DESTROY_SUCCESS,
    SIZE_DESTROY_FAIL,
    SIZE_DESTROY_RESET,
    SIZE_RESTORE_REQUEST,
    SIZE_RESTORE_SUCCESS,
    SIZE_RESTORE_FAIL,
    SIZE_RESTORE_RESET,
} from '../../constants/productConstant';

const productReducer = (state = _state.productState, action) => {
    switch (action.type) {
        case PRODUCTS_LIST: {
            return {
                ...state,
                products_list: action.payload,
            };
        }
        case PRODUCTS_SEARCH: {
            return {
                ...state,
                products_search: action.payload,
            };
        }
        case COLORS_LIST: {
            return {
                ...state,
                colors_list: action.payload,
            };
        }
        case SIZES_LIST: {
            return {
                ...state,
                sizes_list: action.payload,
            };
        }

        /////////////////
        case SET_PRODUCT: {
            return {
                ...state,
                product: action.payload,
            };
        }
        case SET_COLOR: {
            return {
                ...state,
                color: action.payload,
            };
        }
        case SET_SIZE: {
            return {
                ...state,
                size: action.payload,
            };
        }

        //COMMENT PRODUCT
        case PRODUCT_REVIEW_CREATE_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case PRODUCT_REVIEW_CREATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                review: action.payload,
            };
        }
        case PRODUCT_REVIEW_CREATE_FAIL: {
            return { ...state, loading: false, error: action.payload };
        }

        case PRODUCT_REVIEW_CREATE_RESET: {
            return { ...state, review: '', success: false, error: '' };
        }

        //MARK COMMENT
        case PRODUCT_MARK_ALL_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case PRODUCT_MARK_ALL_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
            };
        }
        case PRODUCT_MARK_ALL_FAIL: {
            return { ...state, loading: false, error: action.payload };
        }
        case PRODUCT_MARK_ALL_RESET: {
            return { ...state, success: false, error: '' };
        }

        //STATUS PRODUCT TO TRASH
        case PRODUCT_STATUS_REQUEST:
            return {
                ...state,
                active: false,
            };
        case PRODUCT_STATUS_SUCCESS:
            return {
                ...state,
                active: true,
            };
        case PRODUCT_STATUS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case PRODUCT_STATUS_RESET:
            return { ...state, active: false, error: '' };

        //PUSH PRODUCT TO TRASH
        case PRODUCT_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case PRODUCT_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE PRODUCT
        case PRODUCT_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case PRODUCT_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case PRODUCT_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case PRODUCT_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE PRODUCT
        case PRODUCT_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case PRODUCT_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case PRODUCT_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case PRODUCT_RESTORE_RESET:
            return { ...state, restore: false, error: '' };

        //PUSH COLOR TO TRASH
        case COLOR_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case COLOR_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case COLOR_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case COLOR_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE COLOR
        case COLOR_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case COLOR_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case COLOR_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case COLOR_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE COLOR
        case COLOR_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case COLOR_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case COLOR_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case COLOR_RESTORE_RESET:
            return { ...state, restore: false, error: '' };

        //PUSH SIZE TO TRASH
        case SIZE_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case SIZE_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case SIZE_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case SIZE_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE SIZE
        case SIZE_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case SIZE_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case SIZE_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case SIZE_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE SIZE
        case SIZE_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case SIZE_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case SIZE_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case SIZE_RESTORE_RESET:
            return { ...state, restore: false, error: '' };

        default:
            return state;
    }
};
export default productReducer;
