import { toast } from 'react-toastify';
import api from '../../api';
import {
    CONTACT_CREATE_FAIL,
    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,
    CONTACT_DELETE_FAIL,
    CONTACT_DELETE_REQUEST,
    CONTACT_DELETE_SUCCESS,
    CONTACT_DESTROY_FAIL,
    CONTACT_DESTROY_REQUEST,
    CONTACT_DESTROY_SUCCESS,
    CONTACT_DETAILS_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_LIST_FAIL,
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_REPLY_FAIL,
    CONTACT_REPLY_REQUEST,
    CONTACT_REPLY_SUCCESS,
    CONTACT_RESTORE_FAIL,
    CONTACT_RESTORE_REQUEST,
    CONTACT_RESTORE_SUCCESS,
    CONTACT_STATUS_FAIL,
    CONTACT_STATUS_REQUEST,
    CONTACT_STATUS_SUCCESS,
    CONTACT_TRASH_LIST_FAIL,
    CONTACT_TRASH_LIST_REQUEST,
    CONTACT_TRASH_LIST_SUCCESS,
} from '../../constants/contactConstant';

export const createContact = (contact) => async (dispatch) => {
    dispatch({ type: CONTACT_CREATE_REQUEST, payload: contact });
    try {
        const { data } = await api.post('/api/contact', contact);
        dispatch({ type: CONTACT_CREATE_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: CONTACT_CREATE_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const detailsContact = (contactId) => async (dispatch) => {
    dispatch({ type: CONTACT_DETAILS_REQUEST, payload: contactId });
    try {
        const { data } = await api.get(`/api/contact/${contactId}/edit`);
        dispatch({ type: CONTACT_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: CONTACT_DETAILS_FAIL, payload: message });
    }
};

export const listContact = () => async (dispatch) => {
    dispatch({ type: CONTACT_LIST_REQUEST });
    try {
        const { data } = await api.get(`/api/contact/`);
        dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: CONTACT_LIST_FAIL, payload: message });
    }
};

export const listTrashContact = () => async (dispatch) => {
    dispatch({ type: CONTACT_TRASH_LIST_REQUEST });
    try {
        const { data } = await api.get(`/api/contact/trash`);
        dispatch({ type: CONTACT_TRASH_LIST_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: CONTACT_TRASH_LIST_FAIL, payload: message });
    }
};

export const sendReply = (contact) => async (dispatch) => {
    dispatch({ type: CONTACT_REPLY_REQUEST, payload: { contact } });
    try {
        const { data } = await api.put(`/api/contact/${contact._id}`, contact);
        console.log(data);
        dispatch({ type: CONTACT_REPLY_SUCCESS, payload: data });
        document.location.href = '/admin/contacts';
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: CONTACT_REPLY_FAIL, payload: message });
    }
};

export const deleteContacts = (data) => async (dispatch) => {
    dispatch({ type: CONTACT_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/contact', { data: ids });
        if (isDeleted) {
            toast.success('Liên hệ đã được đưa vào thùng rác !');
            dispatch({
                type: CONTACT_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CONTACT_DELETE_FAIL, payload: message });
    }
};

export const destroyContacts = (data) => async (dispatch) => {
    dispatch({ type: CONTACT_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/contact/force', { data: ids });
        if (isDestroy) {
            toast.success('Liên hệ đã được xóa hoàn toàn !');
            dispatch({
                type: CONTACT_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CONTACT_DESTROY_FAIL, payload: message });
    }
};

export const restoreContacts = (data) => async (dispatch) => {
    dispatch({ type: CONTACT_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/contact/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Liên hệ đã được phục hồi !');
            dispatch({
                type: CONTACT_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CONTACT_RESTORE_FAIL, payload: message });
    }
};

export const activeContacts = (data) => async (dispatch) => {
    dispatch({ type: CONTACT_STATUS_REQUEST });
    try {
        const isActive = await api.patch('api/contact/' + data);
        if (isActive) {
            toast.success('Thay đổi trạng thái thành công !');
            dispatch({
                type: CONTACT_STATUS_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CONTACT_STATUS_FAIL, payload: message });
    }
};
