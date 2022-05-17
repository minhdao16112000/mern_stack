import * as _state from '../states/topicState';
import {
    TOPIC_LIST,
    SET_TOPIC,
    TOPIC_STATUS_REQUEST,
    TOPIC_STATUS_SUCCESS,
    TOPIC_STATUS_FAIL,
    TOPIC_STATUS_RESET,
    TOPIC_DELETE_REQUEST,
    TOPIC_DELETE_SUCCESS,
    TOPIC_DELETE_FAIL,
    TOPIC_DELETE_RESET,
    TOPIC_DESTROY_REQUEST,
    TOPIC_DESTROY_SUCCESS,
    TOPIC_DESTROY_FAIL,
    TOPIC_DESTROY_RESET,
    TOPIC_RESTORE_REQUEST,
    TOPIC_RESTORE_SUCCESS,
    TOPIC_RESTORE_FAIL,
    TOPIC_RESTORE_RESET,
} from '../../constants/topicConstant';

const topicReducer = (state = _state.topicState, action) => {
    switch (action.type) {
        case TOPIC_LIST: {
            return {
                ...state,
                topics: action.payload,
            };
        }
        case SET_TOPIC: {
            return {
                ...state,
                topic: action.payload,
            };
        }

        //STATUS TOPIC TO TRASH
        case TOPIC_STATUS_REQUEST:
            return {
                ...state,
                active: false,
            };
        case TOPIC_STATUS_SUCCESS:
            return {
                ...state,
                active: true,
            };
        case TOPIC_STATUS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case TOPIC_STATUS_RESET:
            return { ...state, active: false, error: '' };

        //PUSH TOPIC TO TRASH
        case TOPIC_DELETE_REQUEST:
            return {
                ...state,
                trash: false,
            };
        case TOPIC_DELETE_SUCCESS:
            return {
                ...state,
                trash: true,
            };
        case TOPIC_DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case TOPIC_DELETE_RESET:
            return { ...state, trash: false, error: '' };

        //DELETE TOPIC
        case TOPIC_DESTROY_REQUEST:
            return {
                ...state,
                delete: false,
            };
        case TOPIC_DESTROY_SUCCESS:
            return {
                ...state,
                delete: true,
            };
        case TOPIC_DESTROY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case TOPIC_DESTROY_RESET:
            return { ...state, delete: false, error: '' };

        //RESTORE TOPIC
        case TOPIC_RESTORE_REQUEST:
            return {
                ...state,
                restore: false,
            };
        case TOPIC_RESTORE_SUCCESS:
            return {
                ...state,
                restore: true,
            };
        case TOPIC_RESTORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case TOPIC_RESTORE_RESET:
            return { ...state, restore: false, error: '' };

        default:
            return state;
    }
};
export default topicReducer;
