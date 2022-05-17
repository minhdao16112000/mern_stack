import { toast } from 'react-toastify';
import api from '../../api';
import {
    IMAGES,
    IMAGE_DELETE_FAIL,
    IMAGE_DELETE_REQUEST,
    IMAGE_DELETE_SUCCESS,
    IMAGE_DESTROY_FAIL,
    IMAGE_DESTROY_REQUEST,
    IMAGE_DESTROY_SUCCESS,
    IMAGE_RESTORE_FAIL,
    IMAGE_RESTORE_REQUEST,
    IMAGE_RESTORE_SUCCESS,
    IMAGE_STATUS_FAIL,
    IMAGE_STATUS_REQUEST,
    IMAGE_STATUS_SUCCESS,
    SET_IMAGE,
} from '../../constants/imageConstant';

//GET ACTIONS BEGIN

export const getImages = () => async (dispatch) => {
    try {
        const res = await api.get('api/image');
        dispatch({ type: IMAGES, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getImageSlug = (slug) => async (dispatch) => {
    try {
        const res = await api.get(`api/image/${slug}`);
        dispatch({ type: SET_IMAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getImage = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/image/' + id + '/edit');
        dispatch({ type: SET_IMAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashImages = () => async (dispatch) => {
    try {
        const res = await api.get('api/image/trash');
        dispatch({ type: IMAGES, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//Image ACTIONS BEGIN
export const storeImage = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/image/store', data);
        if (isSucc) {
            document.location.href = '/admin/images';
            toast.success('Thêm hình ảnh thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storeImageAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/image/store', data);
        if (isSucc) {
            toast.success('Thêm hình ảnh thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const postImgImage = (data) => async (dispatch) => {
    try {
        await api.post('api/image/imagePost', data);
    } catch (e) {
        console.log(e);
    }
};
//Image ACTIONS END

//DELETE ACTION BEGIN
export const deleteImages = (data) => async (dispatch) => {
    dispatch({ type: IMAGE_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/image', { data: ids });
        if (isDeleted) {
            toast.success('Hình ảnh đã được đưa vào thùng rác !');
            dispatch({
                type: IMAGE_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: IMAGE_DELETE_FAIL, payload: message });
    }
};

export const destroyImages = (data) => async (dispatch) => {
    dispatch({ type: IMAGE_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/image/force', { data: ids });
        if (isDestroy) {
            toast.success('Hình ảnh đã được xóa hoàn toàn !');
            dispatch({
                type: IMAGE_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: IMAGE_DESTROY_FAIL, payload: message });
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restoreImages = (data) => async (dispatch) => {
    dispatch({ type: IMAGE_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/image/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Hình ảnh đã được phục hồi !');
            dispatch({
                type: IMAGE_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: IMAGE_RESTORE_FAIL, payload: message });
    }
};

export const activeImages = (data) => async (dispatch) => {
    dispatch({ type: IMAGE_STATUS_REQUEST });
    try {
        const isActive = await api.patch('api/image/' + data);
        if (isActive) {
            toast.success('Thay đổi trạng thái thành công !');
            dispatch({
                type: IMAGE_STATUS_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: IMAGE_STATUS_FAIL, payload: message });
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updateImage = (image) => async (dispatch) => {
    try {
        const isSucc = await api.put(`api/image/${image.id}`, image.formData);
        if (isSucc) {
            document.location.href = '/admin/images';
            toast.success('Cập nhật hình ảnh thành cônng !');
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
