import { toast } from 'react-toastify';
import api from '../../api';
import {
    PAGES_LIST,
    PAGE_DELETE_FAIL,
    PAGE_DELETE_REQUEST,
    PAGE_DELETE_SUCCESS,
    PAGE_DESTROY_FAIL,
    PAGE_DESTROY_REQUEST,
    PAGE_DESTROY_SUCCESS,
    PAGE_RESTORE_FAIL,
    PAGE_RESTORE_REQUEST,
    PAGE_RESTORE_SUCCESS,
    PAGE_STATUS_FAIL,
    PAGE_STATUS_REQUEST,
    PAGE_STATUS_SUCCESS,
    SET_PAGE,
} from '../../constants/pageConstant';

//GET ACTIONS BEGIN

export const getPages = () => async (dispatch) => {
    try {
        const res = await api.get('api/page');
        dispatch({ type: PAGES_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getPageSlug = (slug) => async (dispatch) => {
    try {
        const res = await api.get(`api/page/${slug}`);
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getPage = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/page/' + id + '/edit');
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashPages = () => async (dispatch) => {
    try {
        const res = await api.get('api/page/trash');
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//POST ACTIONS BEGIN
export const storePage = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/page/store', data);
        if (isSucc) {
            document.location.href = '/admin/pages';
            toast.success('Thêm trang thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storePageAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/page/store', data);
        if (isSucc) {
            toast.success('Thêm trang thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deletePages = (data) => async (dispatch) => {
    dispatch({ type: PAGE_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/page', { data: ids });
        if (isDeleted) {
            toast.success('Trang đã được đưa vào thùng rác !');
            dispatch({
                type: PAGE_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PAGE_DELETE_FAIL, payload: message });
    }
};

export const destroyPages = (data) => async (dispatch) => {
    dispatch({ type: PAGE_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/page/force', { data: ids });
        if (isDestroy) {
            toast.success('Trang đã được xóa hoàn toàn !');
            dispatch({
                type: PAGE_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PAGE_DESTROY_FAIL, payload: message });
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restorePages = (data) => async (dispatch) => {
    dispatch({ type: PAGE_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/page/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Trang đã được phục hồi !');
            dispatch({
                type: PAGE_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PAGE_RESTORE_FAIL, payload: message });
    }
};

export const activePages = (data) => async (dispatch) => {
    dispatch({ type: PAGE_STATUS_REQUEST });
    try {
        const isActive = await api.patch('api/page/' + data);
        if (isActive) {
            toast.success('Thay đổi trạng thái thành công !');
            dispatch({
                type: PAGE_STATUS_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PAGE_STATUS_FAIL, payload: message });
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updatePage = (page) => async (dispatch) => {
    try {
        const isSucc = await api.put(`api/page/${page.id}`, page);
        if (isSucc) {
            document.location.href = '/admin/pages';
            toast.success('Cập nhật trang thành cônng !');
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
