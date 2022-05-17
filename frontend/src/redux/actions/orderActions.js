import { toast } from 'react-toastify';
import api from '../../api';
import { DELETE_ALL_CART } from '../../constants/cartConstant';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DESTROY_FAIL,
    ORDER_DESTROY_REQUEST,
    ORDER_DESTROY_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_TRASH_FAIL,
    ORDER_LIST_TRASH_REQUEST,
    ORDER_LIST_TRASH_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_RESTORE_FAIL,
    ORDER_RESTORE_REQUEST,
    ORDER_RESTORE_SUCCESS,
    ORDER_STATUS_FAIL,
    ORDER_STATUS_REQUEST,
    ORDER_STATUS_SUCCESS,
} from '../../constants/orderConstant';

export const createOrder = (order) => async (dispatch) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        if (order.paymentMethod === 'cash') {
            alert(
                'Bạn đã đặt hàng thành công !!! Vui lòng kiểm tra xác nhận đơn hàng trong email'
            );
            await api.patch('/api/product/decrease-qty', order);
            const { data } = await api.post('/api/order', order);
            await api.post('/api/order/send-email', data);
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        } else {
            const { data } = await api.post('/api/order', order);
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        }
        dispatch({ type: DELETE_ALL_CART });
        localStorage.removeItem('persist:root');
    } catch (e) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    try {
        const { data } = await api.get(`/api/order/${orderId}`);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
};

export const payOrder = (order, paymentResult) => async (dispatch) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    try {
        // await api.patch('/api/product/decrease-qty', order);
        const { data } = await api.put(
            `/api/order/${order._id}/pay`,
            paymentResult
        );
        await api.post('/api/order/send-email', data);
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
};

export const deliveredOrder = (order) => async (dispatch) => {
    dispatch({ type: ORDER_DELIVERED_REQUEST, payload: { order } });
    try {
        const { data } = await api.put(
            `/api/order/${order.id}/delivered`,
            order
        );
        dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_DELIVERED_FAIL, payload: message });
    }
};

export const statusOrder = (order) => async (dispatch) => {
    dispatch({ type: ORDER_STATUS_REQUEST, payload: { order } });
    try {
        const { data } = await api.patch(
            `/api/order/${order.id}/status`,
            order
        );
        dispatch({ type: ORDER_STATUS_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_STATUS_FAIL, payload: message });
    }
};

export const listOrderMine = () => async (dispatch) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const user = JSON.parse(localStorage.getItem('userInfo'))._id;
    try {
        const { data } = await api.get(`/api/order/${user}/mine`);
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
};

export const listOrder = () => async (dispatch) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    try {
        const { data } = await api.get(`/api/order/`);
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
};

export const listTrashOrders = () => async (dispatch) => {
    dispatch({ type: ORDER_LIST_TRASH_REQUEST });
    try {
        const res = await api.get('api/order/trash');
        dispatch({ type: ORDER_LIST_TRASH_SUCCESS, payload: res.data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_LIST_TRASH_FAIL, payload: message });
    }
};

export const deleteOrders = (data) => async (dispatch) => {
    dispatch({ type: ORDER_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/order', { data: ids });
        if (isDeleted) {
            toast.success('Đơn hàng đã được đưa vào thùng rác !');
            dispatch({
                type: ORDER_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DELETE_FAIL, payload: message });
    }
};

export const destroyOrders = (data) => async (dispatch) => {
    dispatch({ type: ORDER_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/order/force', { data: ids });
        if (isDestroy) {
            toast.success('Đơn hàng đã được xóa hoàn toàn !');
            dispatch({
                type: ORDER_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DESTROY_FAIL, payload: message });
    }
};

export const restoreOrders = (data) => async (dispatch) => {
    dispatch({ type: ORDER_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/order/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Đơn hàng đã được phục hồi !');
            dispatch({
                type: ORDER_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_RESTORE_FAIL, payload: message });
    }
};

export const exportOrders = () => async (dispatch) => {
    try {
        await api.post('api/order/export-excel', {
            month: '3',
        });
    } catch (e) {
        console.log(e);
    }
};
