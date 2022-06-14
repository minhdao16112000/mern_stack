import {
    VOUCHER_DELETE_FAIL,
    VOUCHER_DELETE_REQUEST,
    VOUCHER_DELETE_RESET,
    VOUCHER_DELETE_SUCCESS,
    VOUCHER_DESTROY_FAIL,
    VOUCHER_DESTROY_REQUEST,
    VOUCHER_DESTROY_RESET,
    VOUCHER_DESTROY_SUCCESS,
    VOUCHER_DETAILS_FAIL,
    VOUCHER_DETAILS_REQUEST,
    VOUCHER_DETAILS_RESET,
    VOUCHER_DETAILS_SUCCESS,
    VOUCHER_LIST_FAIL,
    VOUCHER_LIST_REQUEST,
    VOUCHER_LIST_SUCCESS,
    VOUCHER_LIST_TRASH_FAIL,
    VOUCHER_LIST_TRASH_REQUEST,
    VOUCHER_LIST_TRASH_SUCCESS,
    VOUCHER_RESTORE_FAIL,
    VOUCHER_RESTORE_REQUEST,
    VOUCHER_RESTORE_RESET,
    VOUCHER_RESTORE_SUCCESS,
} from '../../constants/voucherConstant';
import * as _state from '../states/voucherState';

const voucherReducer = (state = _state.voucherState, action) => {
    switch (action.type) {
        //voucher List
        case VOUCHER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VOUCHER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                vouchers: action.payload,
            };
        case VOUCHER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //voucher List Trash
        case VOUCHER_LIST_TRASH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VOUCHER_LIST_TRASH_SUCCESS:
            return {
                ...state,
                loading: false,
                vouchers: action.payload,
            };
        case VOUCHER_LIST_TRASH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //voucher Details
        case VOUCHER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VOUCHER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                voucher: action.payload,
            };
        case VOUCHER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case VOUCHER_DETAILS_RESET:
            return { ...state, voucher: '', error: [], success: false };

        //PUSH voucher TO TRASH
        case VOUCHER_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case VOUCHER_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case VOUCHER_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case VOUCHER_DELETE_RESET:
            return { ...state, trash: false, error: [] };

        //DELETE voucher
        case VOUCHER_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case VOUCHER_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case VOUCHER_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case VOUCHER_DESTROY_RESET:
            return { ...state, delete: false, error: [] };

        //RESTORE voucher
        case VOUCHER_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case VOUCHER_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case VOUCHER_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case VOUCHER_RESTORE_RESET:
            return { ...state, restore: false, error: [] };

        // //voucher Pay
        // case VOUCHER_PAY_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     };
        // case VOUCHER_PAY_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         success: true,
        //     };
        // case VOUCHER_PAY_FAIL:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //     };
        // case VOUCHER_PAY_RESET:
        //     return {};
        // //voucher Delivered
        // case VOUCHER_DELIVERED_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     };
        // case VOUCHER_DELIVERED_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         success: true,
        //     };
        // case VOUCHER_DELIVERED_FAIL:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //     };
        // case VOUCHER_DELIVERED_RESET:
        //     return {};
        // //voucher Status
        // case VOUCHER_STATUS_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     };
        // case VOUCHER_STATUS_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         success: true,
        //     };
        // case VOUCHER_STATUS_FAIL:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //     };
        // case VOUCHER_STATUS_RESET:
        //     return {};
        // //voucher List Mine
        // case VOUCHER_MINE_LIST_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     };
        // case VOUCHER_MINE_LIST_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         vouchers: action.payload,
        //     };
        // case VOUCHER_MINE_LIST_FAIL:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //     };

        // //voucher List Trash
        // case VOUCHER_LIST_TRASH_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     };
        // case VOUCHER_LIST_TRASH_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         vouchers: action.payload,
        //     };
        // case VOUCHER_LIST_TRASH_FAIL:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //     };

        default:
            return state;
    }
};

export default voucherReducer;
