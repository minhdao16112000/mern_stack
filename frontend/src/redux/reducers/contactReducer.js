import {
    CONTACT_CREATE_FAIL,
    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_RESET,
    CONTACT_CREATE_SUCCESS,
    CONTACT_DELETE_FAIL,
    CONTACT_DELETE_REQUEST,
    CONTACT_DELETE_RESET,
    CONTACT_DELETE_SUCCESS,
    CONTACT_DESTROY_FAIL,
    CONTACT_DESTROY_REQUEST,
    CONTACT_DESTROY_RESET,
    CONTACT_DESTROY_SUCCESS,
    CONTACT_DETAILS_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_LIST_FAIL,
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_REPLY_FAIL,
    CONTACT_REPLY_REQUEST,
    CONTACT_REPLY_SUCCESS,
    CONTACT_RESTORE_FAIL,
    CONTACT_RESTORE_REQUEST,
    CONTACT_RESTORE_RESET,
    CONTACT_RESTORE_SUCCESS,
    CONTACT_TRASH_LIST_FAIL,
    CONTACT_TRASH_LIST_REQUEST,
    CONTACT_TRASH_LIST_SUCCESS,
} from '../../constants/contactConstant';
import * as _state from '../states/contactState';

const contactReducer = (state = _state.contactState, action) => {
    switch (action.type) {
        case CONTACT_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                contact: action.payload,
            };
        case CONTACT_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CONTACT_CREATE_RESET:
            return {
                loading: false,
                success: false,
                contacts: [],
                contact: [],
                error: [],
            };
        //Contact Details
        case CONTACT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                contact: action.payload,
            };
        case CONTACT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //Contact List
        case CONTACT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                contacts: action.payload,
            };
        case CONTACT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //Contact List Trah
        case CONTACT_TRASH_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_TRASH_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                contactTrash: action.payload,
            };
        case CONTACT_TRASH_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //Reply Contact
        case CONTACT_REPLY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_REPLY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case CONTACT_REPLY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //PUSH CONTACT TO TRASH
        case CONTACT_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case CONTACT_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case CONTACT_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CONTACT_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE CONTACT
        case CONTACT_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case CONTACT_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case CONTACT_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CONTACT_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE CONTACT
        case CONTACT_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case CONTACT_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case CONTACT_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CONTACT_RESTORE_RESET:
            return { ...state, restore: false, error: '' };
        default:
            return state;
    }
};

export default contactReducer;
