import { toast } from 'react-toastify';
import api from '../../api';
import {
    TOPIC_LIST,
    SET_TOPIC,
    TOPIC_DELETE_REQUEST,
    TOPIC_DELETE_SUCCESS,
    TOPIC_DELETE_FAIL,
    TOPIC_DESTROY_REQUEST,
    TOPIC_DESTROY_SUCCESS,
    TOPIC_DESTROY_FAIL,
    TOPIC_RESTORE_REQUEST,
    TOPIC_RESTORE_SUCCESS,
    TOPIC_RESTORE_FAIL,
    TOPIC_STATUS_REQUEST,
    TOPIC_STATUS_SUCCESS,
    TOPIC_STATUS_FAIL,
} from '../../constants/topicConstant';

//GET ACTIONS BEGIN
export const getTopics = () => async (dispatch) => {
    try {
        const res = await api.get('api/topic');
        dispatch({ type: TOPIC_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTopic = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/topic/' + id + '/edit');
        dispatch({ type: SET_TOPIC, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashTopics = () => async (dispatch) => {
    try {
        const res = await api.get('api/topic/trash');
        dispatch({ type: TOPIC_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//POST ACTIONS BEGIN
export const storeTopic = (data) => async (dispatch) => {
    try {
        const isSuccess = await api.post('api/topic/store', data);
        if (isSuccess) {
            document.location.href = '/admin/topics';
            toast.success('Thêm chủ đề phẩm thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storeTopicAndContinue = (data) => async (dispatch) => {
    try {
        const isSuccess = await api.post('api/topic/store', data);
        if (isSuccess) {
            toast.success('Thêm chủ đề phẩm thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const postImgTopic = (data) => async (dispatch) => {
    try {
        await api.post('api/topic/imageTopic', data);
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deleteTopics = (data) => async (dispatch) => {
    dispatch({ type: TOPIC_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/topic', { data: ids });
        if (isDeleted) {
            toast.success('Chủ đề đã được đưa vào thùng rác !');
            dispatch({
                type: TOPIC_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: TOPIC_DELETE_FAIL, payload: message });
    }
};

export const destroyTopics = (data) => async (dispatch) => {
    dispatch({ type: TOPIC_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/topic/force', { data: ids });
        if (isDestroy) {
            toast.success('Chủ đề đã được xóa hoàn toàn !');
            dispatch({
                type: TOPIC_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: TOPIC_DESTROY_FAIL, payload: message });
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restoreTopics = (data) => async (dispatch) => {
    dispatch({ type: TOPIC_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/topic/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Chủ đề đã được phục hồi !');
            dispatch({
                type: TOPIC_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: TOPIC_RESTORE_FAIL, payload: message });
    }
};

export const activeTopics = (data) => async (dispatch) => {
    dispatch({ type: TOPIC_STATUS_REQUEST });
    try {
        const isActive = await api.patch('api/topic/' + data);
        if (isActive) {
            toast.success('Thay đổi trạng thái thành công !');
            dispatch({
                type: TOPIC_STATUS_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: TOPIC_STATUS_FAIL, payload: message });
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updateTopic = (category) => async (dispatch) => {
    try {
        const data = await api.put(`api/topic/${category.id}`, category);
        if (data) {
            document.location.href = '/admin/topics';
            toast.success('Cập nhật chủ đề thành cônng !');
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
