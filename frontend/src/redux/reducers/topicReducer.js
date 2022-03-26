import * as _state from "../states/topicState";
import {TOPIC_LIST, SET_TOPIC} from '../../constants/topicConstant';

const topicReducer = (state= _state.topicState, action) => {
    switch (action.type) {
        case TOPIC_LIST:{
            return{
                ...state,
                topics: action.payload,
            };
        }
        case SET_TOPIC:{
            return{
                ...state,
                topic: action.payload,
            };
        }
        default:
            return state;
    }
}
export default topicReducer;
