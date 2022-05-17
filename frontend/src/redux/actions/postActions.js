import { toast } from 'react-toastify';
import api from '../../api';
import {
    POSTS_LIST,
    POST_DELETE_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DESTROY_FAIL,
    POST_DESTROY_REQUEST,
    POST_DESTROY_SUCCESS,
    POST_RESTORE_FAIL,
    POST_RESTORE_REQUEST,
    POST_RESTORE_SUCCESS,
    POST_STATUS_FAIL,
    POST_STATUS_REQUEST,
    POST_STATUS_SUCCESS,
    SET_POST,
} from '../../constants/postConstant';

//GET ACTIONS BEGIN

export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.get('api/post');
        dispatch({ type: POSTS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getPostSlug = (slug) => async (dispatch) => {
    try {
        const res = await api.get(`api/post/${slug}`);
        dispatch({ type: SET_POST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getPost = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/post/' + id + '/edit');
        dispatch({ type: SET_POST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashPosts = () => async (dispatch) => {
    try {
        const res = await api.get('api/post/trash');
        dispatch({ type: POSTS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//POST ACTIONS BEGIN
export const storePost = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/post/store', data);
        if (isSucc) {
            document.location.href = '/admin/posts';
            toast.success('Thêm bài viết thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storePostAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/post/store', data);
        if (isSucc) {
            toast.success('Thêm bài viết thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const postImgPost = (data) => async (dispatch) => {
    try {
        await api.post('api/post/imagePost', data);
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deletePosts = (data) => async (dispatch) => {
    dispatch({ type: POST_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/post', { data: ids });
        if (isDeleted) {
            toast.success('Bài viết đã được đưa vào thùng rác !');
            dispatch({
                type: POST_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: POST_DELETE_FAIL, payload: message });
    }
};

export const destroyPosts = (data) => async (dispatch) => {
    dispatch({ type: POST_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/post/force', { data: ids });
        if (isDestroy) {
            toast.success('Bài viết đã được xóa hoàn toàn !');
            dispatch({
                type: POST_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: POST_DESTROY_FAIL, payload: message });
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restorePosts = (data) => async (dispatch) => {
    dispatch({ type: POST_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/post/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Bài viết đã được phục hồi !');
            dispatch({
                type: POST_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: POST_RESTORE_FAIL, payload: message });
    }
};

export const activePosts = (data) => async (dispatch) => {
    dispatch({ type: POST_STATUS_REQUEST });
    try {
        const isActive = await api.patch('api/post/' + data);
        if (isActive) {
            toast.success('Thay đổi trạng thái thành công !');
            dispatch({
                type: POST_STATUS_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: POST_STATUS_FAIL, payload: message });
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updatePost = (post) => async (dispatch) => {
    try {
        const isSucc = await api.put(`api/post/${post.id}`, post.formData);
        if (isSucc) {
            document.location.href = '/admin/posts';
            toast.success('Cập nhật bài viết thành cônng !');
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
