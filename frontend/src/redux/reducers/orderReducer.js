import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_RESET,
    ORDER_DELETE_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_RESET,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DESTROY_FAIL,
    ORDER_DESTROY_REQUEST,
    ORDER_DESTROY_RESET,
    ORDER_DESTROY_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_TRASH_FAIL,
    ORDER_LIST_TRASH_REQUEST,
    ORDER_LIST_TRASH_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
    ORDER_RESTORE_FAIL,
    ORDER_RESTORE_REQUEST,
    ORDER_RESTORE_RESET,
    ORDER_RESTORE_SUCCESS,
    ORDER_STATUS_FAIL,
    ORDER_STATUS_REQUEST,
    ORDER_STATUS_RESET,
    ORDER_STATUS_SUCCESS,
} from '../../constants/orderConstant';
import * as _state from '../states/orderState';

const orderReducer = (state = _state.orderState, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload,
            };
        case ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ORDER_CREATE_RESET:
            return {};
        //Order Details
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //Order Pay
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case ORDER_PAY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ORDER_PAY_RESET:
            return {};
        //Order Delivered
        case ORDER_DELIVERED_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DELIVERED_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload,
            };
        case ORDER_DELIVERED_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ORDER_DELIVERED_RESET:
            return { ...state, error: '', success: false };
        //Order Status
        case ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case ORDER_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ORDER_STATUS_RESET:
            return {};
        //Order List Mine
        case ORDER_MINE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_MINE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case ORDER_MINE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //Order List
        case ORDER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case ORDER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //Order List Trash
        case ORDER_LIST_TRASH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_LIST_TRASH_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case ORDER_LIST_TRASH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //PUSH ORDER TO TRASH
        case ORDER_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case ORDER_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case ORDER_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case ORDER_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE ORDER
        case ORDER_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case ORDER_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case ORDER_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case ORDER_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE ORDER
        case ORDER_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case ORDER_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case ORDER_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case ORDER_RESTORE_RESET:
            return { ...state, restore: false, error: '' };
        default:
            return state;
    }
};

export default orderReducer;
