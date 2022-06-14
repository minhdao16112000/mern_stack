import * as _state from '../states/userState';
import {
    REMOVE_USER,
    SET_USER,
    SET_ROLE,
    SET_USERS,
    USER_LOGIN_FAIL,
    RESET_MESSAGE,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET,
    USER_DESTROY_REQUEST,
    USER_DESTROY_SUCCESS,
    USER_DESTROY_FAIL,
    USER_DESTROY_RESET,
    USER_RESTORE_REQUEST,
    USER_RESTORE_SUCCESS,
    USER_RESTORE_FAIL,
    USER_RESTORE_RESET,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAIL,
    USER_INFO_RESET,
} from '../../constants/userConstant';

const userReducer = (state = _state.userState, action) => {
    switch (action.type) {
        case RESET_MESSAGE: {
            return {
                ...state,
                message_login_fail: '',
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.payload,
            };
        }
        case SET_USER: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case SET_ROLE: {
            return {
                ...state,
                isAdmin: action.payload,
            };
        }

        //UPDATE USER INFO
        case USER_INFO_REQUEST:
            return {
                ...state,
                userInfo: false,
            };
        case USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: true,
            };
        case USER_INFO_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case USER_INFO_RESET:
            return { ...state, userInfo: false, error: '' };

        case REMOVE_USER: {
            return {
                ...state,
                isAdmin: false,
            };
        }
        case USER_LOGIN_FAIL: {
            return {
                ...state,
                message_login_fail: action.payload,
            };
        }

        //PUSH USER TO TRASH
        case USER_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case USER_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case USER_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE USER
        case USER_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case USER_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case USER_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case USER_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE USER
        case USER_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case USER_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case USER_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case USER_RESTORE_RESET:
            return { ...state, restore: false, error: '' };
        default:
            return state;
    }
};

export default userReducer;
