import { toast } from 'react-toastify';
import api from '../../api';
import {
    CATE_DELETE_FAIL,
    CATE_DELETE_REQUEST,
    CATE_DELETE_SUCCESS,
    CATE_DESTROY_FAIL,
    CATE_DESTROY_REQUEST,
    CATE_DESTROY_SUCCESS,
    CATE_LIST,
    CATE_RESTORE_FAIL,
    CATE_RESTORE_REQUEST,
    CATE_RESTORE_SUCCESS,
    CATE_STATUS_FAIL,
    CATE_STATUS_REQUEST,
    CATE_STATUS_SUCCESS,
    SET_CATE,
} from '../../constants/categoryConstant';

//GET ACTIONS BEGIN
export const getCategories = () => async (dispatch) => {
    try {
        const res = await api.get('api/category');
        dispatch({ type: CATE_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getCategory = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/category/' + id + '/edit');
        dispatch({ type: SET_CATE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashCategories = () => async (dispatch) => {
    try {
        const res = await api.get('api/category/trash');
        dispatch({ type: CATE_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//POST ACTIONS BEGIN
export const storeCategory = (data) => async (dispatch) => {
    try {
        const isSuccess = await api.post('api/category/store', data);
        if (isSuccess) {
            document.location.href = '/admin/categories';
            toast.success('Thêm danh mục sản phẩm thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storeCategoryAndContinue = (data) => async (dispatch) => {
    try {
        const isSuccess = await api.post('api/category/store', data);
        if (isSuccess) {
            toast.success('Thêm danh mục sản phẩm thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const postImgCategory = (data) => async (dispatch) => {
    try {
        await api.post('api/category/imageCategory', data);
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deleteCategories = (data) => async (dispatch) => {
    dispatch({ type: CATE_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/category', { data: ids });
        if (isDeleted) {
            toast.success('Danh mục đã được đưa vào thùng rác !');
            dispatch({
                type: CATE_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATE_DELETE_FAIL, payload: message });
    }
};

export const destroyCategories = (data) => async (dispatch) => {
    dispatch({ type: CATE_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/category/force', { data: ids });
        if (isDestroy) {
            toast.success('Danh mục đã được xóa hoàn toàn !');
            dispatch({
                type: CATE_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATE_DESTROY_FAIL, payload: message });
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restoreCategories = (data) => async (dispatch) => {
    dispatch({ type: CATE_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/category/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Danh mục đã được phục hồi !');
            dispatch({
                type: CATE_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATE_RESTORE_FAIL, payload: message });
    }
};

export const activeCategories = (data) => async (dispatch) => {
    dispatch({ type: CATE_STATUS_REQUEST });
    try {
        const isActive = await api.patch('api/category/' + data);
        if (isActive) {
            toast.success('Thay đổi trạng thái thành công !');
            dispatch({
                type: CATE_STATUS_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATE_STATUS_FAIL, payload: message });
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updateCategory = (category) => async (dispatch) => {
    try {
        const data = await api.put(
            `api/category/${category.id}`,
            category.formData
        );
        if (data) {
            document.location.href = '/admin/categories';
            toast.success('Cập nhật danh mục sản phẩm thành cônng !');
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
