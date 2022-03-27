import * as _state from "../states/postState";
import {
    POSTS_LIST,
    SET_POST,
} from "../../constants/postConstant";

const postReducer = (state = _state.postState, action) => {
    switch (action.type) {
        case POSTS_LIST: {
            return {
                ...state,
                posts_list: action.payload,
            }
        }
        case SET_POST: {
            // state.posts_list.forEach((value, key) =>{
            //     if(value._id === action.payload._id){
            //         state.post_left.push(value[1]);
            //     }
            // })
            return {
                ...state,
                post: action.payload,
            }
        }
        default:
            return state;
    }
};
export default postReducer;