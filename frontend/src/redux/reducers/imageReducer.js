import {
    IMAGES,
    IMAGE_DELETE_FAIL,
    IMAGE_DELETE_REQUEST,
    IMAGE_DELETE_RESET,
    IMAGE_DELETE_SUCCESS,
    IMAGE_DESTROY_FAIL,
    IMAGE_DESTROY_REQUEST,
    IMAGE_DESTROY_RESET,
    IMAGE_DESTROY_SUCCESS,
    IMAGE_RESTORE_FAIL,
    IMAGE_RESTORE_REQUEST,
    IMAGE_RESTORE_RESET,
    IMAGE_RESTORE_SUCCESS,
    IMAGE_STATUS_FAIL,
    IMAGE_STATUS_REQUEST,
    IMAGE_STATUS_RESET,
    IMAGE_STATUS_SUCCESS,
    SET_IMAGE,
} from '../../constants/imageConstant';
import * as _state from '../states/imageState';

const imageReducer = (state = _state.imageState, action) => {
    switch (action.type) {
        case IMAGES: {
            return {
                ...state,
                images: action.payload,
            };
        }
        case SET_IMAGE: {
            return {
                ...state,
                image: action.payload,
            };
        }

        //STATUS IMAGE TO TRASH
        case IMAGE_STATUS_REQUEST:
            return {
                ...state,
                active: false,
            };
        case IMAGE_STATUS_SUCCESS:
            return {
                ...state,
                active: true,
            };
        case IMAGE_STATUS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case IMAGE_STATUS_RESET:
            return { ...state, active: false, error: '' };

        //PUSH IMAGE TO TRASH
        case IMAGE_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case IMAGE_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case IMAGE_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case IMAGE_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE IMAGE
        case IMAGE_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case IMAGE_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case IMAGE_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case IMAGE_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE IMAGE
        case IMAGE_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case IMAGE_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case IMAGE_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case IMAGE_RESTORE_RESET:
            return { ...state, restore: false, error: '' };

        default:
            return state;
    }
};
export default imageReducer;
