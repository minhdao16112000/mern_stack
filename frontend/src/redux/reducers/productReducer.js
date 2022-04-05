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
        default:
            return state;
    }
};
export default productReducer;
